"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Quaternion, Vector3, THREE } from "three";
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
	const inViewRef = useRef(null);
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
		// Function to update scale based on screen width
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
		clone.traverse((child: THREE.Object3D) => {
			if (child.isMesh) {
				if (child.geometry?.center) child.geometry.center();
				if (child.material) child.material.color.set("#FFFFFF");
				child.frustumCulled = true;
			}
		});
		return clone;
	}, [scene]);

	// Add the cloned scene to our modelRef on mount
	useEffect(() => {
		if (modelRef.current && clonedScene) {
			modelRef.current.add(clonedScene);
		}
	}, [clonedScene]);

	// Setup glitch effect separately
	useEffect(() => {
		const triggerGlitch = () => {
			// Use current inView state
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

		// Update rotation only when in view
		if (isInView) {
			rotation.current.x += rotationSpeed.x;
			rotation.current.y += rotationSpeed.y;
			rotation.current.z += rotationSpeed.z;

			// Apply rotations using quaternions
			modelRef.current.quaternion.setFromAxisAngle(
				yAxis,
				rotation.current.y,
			);
			tempQuaternion.current.setFromAxisAngle(xAxis, rotation.current.x);
			modelRef.current.quaternion.multiply(tempQuaternion.current);
			tempQuaternion.current.setFromAxisAngle(zAxis, rotation.current.z);
			modelRef.current.quaternion.multiply(tempQuaternion.current);
		}

		// Compute and apply current scale (including any glitch effect)
		const scaleValue =
			currentScale *
			(glitchActive.current ? glitchScaleFactor.current : 1);
		modelRef.current.scale.set(scaleValue, scaleValue, scaleValue);
	});

	return (
		<group position={[0, 0, -5]} {...props} ref={inViewRef}>
			<group ref={modelRef} />
		</group>
	);
}
