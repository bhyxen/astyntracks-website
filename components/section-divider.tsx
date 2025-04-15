export default function DiagonalSliceDivider() {
	return (
		<div className="relative h-8 overflow-hidden bg-transparent">
			<svg
				className="absolute top-0 left-0 w-full h-full"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
			>
				<defs>
					<linearGradient
						id="warningGradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="0%"
					>
						<stop
							offset="0%"
							stopColor="#000000"
							stopOpacity="0.1"
						/>
						<stop
							offset="50%"
							stopColor="#fcc800"
							stopOpacity="0.1"
						/>
						<stop
							offset="100%"
							stopColor="#000000"
							stopOpacity="0.1"
						/>
					</linearGradient>
				</defs>
				<polygon
					fill="url(#warningGradient)"
					points="0,100 100,0 100,100"
				/>
			</svg>
		</div>
	);
}
