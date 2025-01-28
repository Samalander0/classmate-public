import { cubicOut } from "svelte/easing";

const defaultFlyAndScaleParams = { y: -8, start: 0.95, duration: 200 };

export function flyAndScale(node, params) {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;
	const withDefaults = { ...defaultFlyAndScaleParams, ...params };

	const scaleConversion = (
		valueA,
		scaleA,
		scaleB
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style) => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return `${str}${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: withDefaults.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [withDefaults.y, 0]);
			const scale = scaleConversion(t, [0, 1], [withDefaults.start, 1]);

			return styleToString({
				transform: `${transform} translate3d(0, ${y}px, 0) scale(${scale})`,
				opacity: t,
			});
		},
		easing: cubicOut,
	};
}