"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Object3D, Mesh, Quaternion, Vector3 } from "three";
import { useInView, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";

// Preload the model
useGLTF.preload("/assets/3d/a-3d-w-compressed.glb");

export default function LogoModel({
	// Default base scale (we use the scroll interpolation to drive it)
	scale = 0.2,
	rotationSpeed = { x: 0.005, y: 0.01, z: 0.003 },
	glitchProbability = 0.3,
	glitchInterval = [2000, 5000],
	glitchDuration = [100, 400],
	...props
}: {
	scale?: MotionValue<number> | number;
	rotationSpeed?: { x: number; y: number; z: number };
	glitchProbability?: number;
	glitchInterval?: [number, number];
	glitchDuration?: [number, number];
	[key: string]: unknown;
}) {
	// Load the 3D model
	const { scene } = useGLTF("/assets/3d/a-3d-w-compressed.glb");
	const modelRef = useRef<Group>(null);
	const inViewRef = useRef<HTMLDivElement>(null);
	const isInView = useInView(inViewRef);

	// State to hold the current scale
	const [currentScale, setCurrentScale] = useState<number>(
		typeof scale === "number" ? scale : 0.2,
	);

	const screenWidth = window.innerWidth;
	const mobileBreakpoint = 768; // Define the breakpoint for mobile devices
	const desktopScale = 0.2; // Scale for desktop devices
	const mobileScale = 0.13; // Scale for mobile devices

	// Set initial scale and add event listener for window resize
	useEffect(() => {
		const updateScale = () => {
			setCurrentScale(
				screenWidth < mobileBreakpoint ? mobileScale : desktopScale,
			);
		};
		updateScale();
		window.addEventListener("resize", updateScale);
		return () => window.removeEventListener("resize", updateScale);
	}, [screenWidth]);

	// Get scroll progress from framer-motion and interpolate from 0.2 to 1
	const { scrollYProgress } = useScroll();
	const interpolatedScale = useTransform(
		scrollYProgress,
		[0, 1],
		[screenWidth < mobileBreakpoint ? mobileScale : desktopScale, 1],
	);

	// Refs for rotation and glitch effect
	const tempQuaternion = useRef(new Quaternion());
	const rotation = useRef({ x: 0, y: 0, z: 0 });
	const xAxis = new Vector3(1, 0, 0);
	const yAxis = new Vector3(0, 1, 0);
	const zAxis = new Vector3(0, 0, 1);
	const glitchActive = useRef(false);
	const glitchScaleFactor = useRef(1);

	// Subscribe to the interpolated scale so it updates smoothly on scroll.
	useEffect(() => {
		const unsubscribe = interpolatedScale.onChange((latest) => {
			setCurrentScale(latest);
		});
		return () => unsubscribe();
	}, [interpolatedScale]);

	// Memoize the cloned and processed scene so it only runs once per model load
	const clonedScene = useMemo(() => {
		const clone = scene.clone();
		clone.traverse((child) => {
			if (child instanceof Mesh) {
				// Center the geometry if the method exists
				child.geometry.center();
				// Update material color if it supports color
				if ("color" in child.material) {
					child.material.color.set("#FFFFFF");
				}
				child.frustumCulled = true;
			}
		});
		return clone;
	}, [scene]);

	// Add the cloned scene to our modelRef on mount
	useEffect(() => {
		if (modelRef.current && clonedScene) {
			// Explicitly cast clonedScene as Object3D to fix the type error.
			modelRef.current.add(clonedScene as unknown as Object3D);
		}
	}, [clonedScene]);

	// Setup glitch effect separately
	useEffect(() => {
		const triggerGlitch = () => {
			if (!isInView || Math.random() > glitchProbability) return;
			glitchActive.current = true;
			glitchScaleFactor.current = 1 + (Math.random() * 0.2 - 0.1);
			setTimeout(
				() => {
					glitchActive.current = false;
					glitchScaleFactor.current = 1;
				},
				Math.random() * (glitchDuration[1] - glitchDuration[0]) +
					glitchDuration[0],
			);
		};

		const intervalTime =
			Math.random() * (glitchInterval[1] - glitchInterval[0]) +
			glitchInterval[0];
		const glitchTimer = setInterval(triggerGlitch, intervalTime);

		return () => clearInterval(glitchTimer);
	}, [isInView, glitchProbability, glitchDuration, glitchInterval]);

	// Apply rotation and scale in the animation loop
	useFrame(() => {
		if (!modelRef.current) return;

		if (isInView) {
			rotation.current.x += rotationSpeed.x;
			rotation.current.y += rotationSpeed.y;
			rotation.current.z += rotationSpeed.z;

			modelRef.current.quaternion.setFromAxisAngle(
				yAxis,
				rotation.current.y,
			);
			tempQuaternion.current.setFromAxisAngle(xAxis, rotation.current.x);
			modelRef.current.quaternion.multiply(tempQuaternion.current);
			tempQuaternion.current.setFromAxisAngle(zAxis, rotation.current.z);
			modelRef.current.quaternion.multiply(tempQuaternion.current);
		}

		const scaleValue =
			currentScale *
			(glitchActive.current ? glitchScaleFactor.current : 1);
		modelRef.current.scale.set(scaleValue, scaleValue, scaleValue);
	});

	return (
		<div ref={inViewRef}>
			<group position={[0, 0, -5]} {...props}>
				<group ref={modelRef} />
			</group>
		</div>
	);
}
