"use client";

import { useRef, useEffect, useMemo } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, Object3D, Mesh, DoubleSide, MeshStandardMaterial } from "three";
import { useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import debounce from "debounce";

// Preload the model
useGLTF.preload("/assets/3d/a-3d-w-compressed.glb");

export default function LogoModel({
	scale = 0.2,
	rotationSpeed = 0.1,
	...props
}: {
	scale?: MotionValue<number> | number;
	rotationSpeed?: number;
	[key: string]: unknown;
}) {
	const { scene } = useGLTF("/assets/3d/a-3d-w-compressed.glb");
	const modelRef = useRef<Group>(null);
	const inViewRef = useRef<HTMLDivElement>(null);

	const mobileBreakpoint = 768;
	const desktopScale = 0.2;
	const mobileScale = 0.13;

	// Memoize rotation speed to avoid unnecessary re-renders
	const memoizedRotationSpeed = useMemo(() => rotationSpeed, [rotationSpeed]);

	// Calculate interpolated scale based on scroll progress
	const { scrollYProgress } = useScroll();
	const interpolatedScale = useTransform(
		scrollYProgress,
		[0, 1],
		[window.innerWidth < mobileBreakpoint ? mobileScale : desktopScale, 1],
	);

	// Clone the scene and center geometries
	const clonedScene = useMemo(() => {
		const clone = scene.clone();
		clone.traverse((child) => {
			if (child instanceof Mesh) {
				child.geometry.center();
				child.geometry.computeVertexNormals(); // Ensure normals are computed
				child.material = new MeshStandardMaterial({
					color: child.material.color || 0xffffff,
					metalness: 0.5, // Adjust for reflectivity
					roughness: 0.5, // Adjust for surface roughness
					side: DoubleSide, // Enable double-sided rendering
				});
			}
		});
		return clone;
	}, [scene]);

	// Add cloned scene to the model reference
	useEffect(() => {
		if (modelRef.current && clonedScene) {
			modelRef.current.add(clonedScene as unknown as Object3D);
		}
		return () => {
			// Clean up cloned scene to avoid memory leaks
			if (modelRef.current && clonedScene) {
				modelRef.current.remove(clonedScene as unknown as Object3D);
			}
		};
	}, [clonedScene]);

	// Update scale dynamically on window resize
	useEffect(() => {
		const updateScale = debounce(() => {
			const scaleValue =
				window.innerWidth < mobileBreakpoint
					? mobileScale
					: desktopScale;
			modelRef.current?.scale.set(scaleValue, scaleValue, scaleValue);
		}, 200);

		updateScale();
		window.addEventListener("resize", updateScale);
		return () => window.removeEventListener("resize", updateScale);
	}, []);

	// Apply rotation and scaling in the animation frame
	useFrame((_, delta) => {
		if (!modelRef.current) return;

		// Apply continuous rotation scaled by delta
		modelRef.current.rotation.y += memoizedRotationSpeed * delta;

		// Apply interpolated scaling
		const scaleValue =
			typeof scale === "number" ? scale : interpolatedScale.get();
		modelRef.current.scale.set(scaleValue, scaleValue, scaleValue);
	});

	return (
		<>
			<Html
				as="div"
				ref={inViewRef}
				style={{ width: "100%", height: "100%" }}
			/>
			<group position={[0, 0, -5]} {...props}>
				{/* Add ambient light for increased brightness */}
				<ambientLight intensity={1} color="#ffffff" castShadow />
				{/* Add directional light for focused lighting */}
				<directionalLight
					intensity={0.3}
					color="#ffffff"
					position={[5, 0, 5]} // Adjust position as needed
					castShadow
				/>
				<pointLight
					intensity={0.3}
					color="#ffffff"
					position={[0, 5, 0]} // Position above the model
					castShadow
				/>
				<group ref={modelRef} />
			</group>
		</>
	);
}
