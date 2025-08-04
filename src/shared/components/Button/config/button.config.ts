import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

export const buttonConfig = cva(
	'flex items-center font-medium cursor-pointer overflow-hidden transition group',
	{
		variants: {
			variant: {
				contained: '',
				outlined: 'border',
				text: '',
				link: '',
			},
			color: {
				primary: '',
				green: '',
				red: '',
				slate: '',
				grey: '',
				lemon: '',
				lilac: '',
				pink: '',
			},
			size: {
				xsmall: 'p-2 gap-2 text-xs',
				small: 'p-2.5 gap-2.5 text-sm',
				medium: 'p-3 gap-3 text-base',
				large: 'p-3.5 gap-3.5 text-lg',
				xlarge: 'p-4 gap-4 text-xl',
			},
			corner: {
				square: 'rounded-none',
				soft: 'rounded-[2px]',
				rounded: 'rounded-[6px]',
				pill: 'rounded-full',
			},
			disabled: {
				true: 'opacity-50 cursor-not-allowed pointer-events-none',
			},
			actived: {
				true: '',
				false: '',
			},
		},
		compoundVariants: [
			// CONTAINED
			{
				variant: 'contained',
				color: 'primary',
				class: 'bg-primary-500 text-white',
			},
			{
				variant: 'contained',
				color: 'green',
				class: 'bg-fb-green-400 text-white',
			},
			{ variant: 'contained', color: 'red', class: 'bg-fb-red-500 text-white' },
			{
				variant: 'contained',
				color: 'lilac',
				class: 'bg-fb-lilac-500 text-white',
			},
			{
				variant: 'contained',
				color: 'pink',
				class: 'bg-fb-pink-500 text-white',
			},
			{
				variant: 'contained',
				color: 'slate',
				class: 'bg-fb-slate-500 text-white',
			},
			{
				variant: 'contained',
				color: 'grey',
				class: 'bg-fb-grey-500 text-white',
			},
			{
				variant: 'contained',
				color: 'lemon',
				class: 'bg-fb-lemon-500 text-white',
			},

			// OUTLINED
			{
				variant: 'outlined',
				color: 'primary',
				class: 'border-primary-200 text-primary-500',
			},
			{
				variant: 'outlined',
				color: 'green',
				class: 'border-fb-green-200 text-fb-green-700',
			},
			{
				variant: 'outlined',
				color: 'red',
				class: 'border-fb-red-200 text-fb-red-500',
			},
			{
				variant: 'outlined',
				color: 'lilac',
				class: 'border-fb-lilac-200 text-fb-lilac-500',
			},
			{
				variant: 'outlined',
				color: 'pink',
				class: 'border-fb-pink-200 text-fb-pink-500',
			},
			{
				variant: 'outlined',
				color: 'slate',
				class: 'border-fb-slate-200 text-fb-slate-700',
			},
			{
				variant: 'outlined',
				color: 'grey',
				class: 'border-fb-grey-200 text-fb-grey-700',
			},
			{
				variant: 'outlined',
				color: 'lemon',
				class: 'border-fb-lemon-200 text-fb-lemon-700',
			},

			// TEXT
			{
				variant: 'text',
				color: 'primary',
				class: 'text-primary-500 hover:bg-primary-50',
			},
			{
				variant: 'text',
				color: 'green',
				class: 'text-fb-green-700 hover:bg-fb-green-50',
			},
			{
				variant: 'text',
				color: 'red',
				class: 'text-fb-red-500 hover:bg-fb-red-50',
			},
			{
				variant: 'text',
				color: 'lilac',
				class: 'text-fb-lilac-500 hover:bg-fb-lilac-50',
			},
			{
				variant: 'text',
				color: 'pink',
				class: 'text-fb-pink-500 hover:bg-fb-pink-50',
			},
			{
				variant: 'text',
				color: 'slate',
				class: 'text-fb-slate-700 hover:bg-fb-slate-50',
			},
			{
				variant: 'text',
				color: 'grey',
				class: 'text-fb-grey-700 hover:bg-fb-grey-50',
			},
			{
				variant: 'text',
				color: 'lemon',
				class: 'text-fb-lemon-700 hover:bg-fb-lemon-50',
			},

			// LINK
			{
				variant: 'link',
				color: 'primary',
				class: 'text-primary-500 underline',
			},
			{ variant: 'link', color: 'green', class: 'text-fb-green-700 underline' },
			{ variant: 'link', color: 'red', class: 'text-fb-red-500 underline' },
			{ variant: 'link', color: 'lilac', class: 'text-fb-lilac-500 underline' },
			{ variant: 'link', color: 'pink', class: 'text-fb-pink-500 underline' },
			{ variant: 'link', color: 'slate', class: 'text-fb-slate-700 underline' },
			{ variant: 'link', color: 'grey', class: 'text-fb-grey-700 underline' },
			{ variant: 'link', color: 'lemon', class: 'text-fb-lemon-700 underline' },

			// ACTIVED para OUTLINED
			{
				variant: 'outlined',
				color: 'primary',
				actived: true,
				class: 'bg-primary-50',
			},
			{
				variant: 'outlined',
				color: 'green',
				actived: true,
				class: 'bg-fb-green-50',
			},
			{
				variant: 'outlined',
				color: 'red',
				actived: true,
				class: 'bg-fb-red-50',
			},
			{
				variant: 'outlined',
				color: 'lilac',
				actived: true,
				class: 'bg-fb-lilac-50',
			},
			{
				variant: 'outlined',
				color: 'pink',
				actived: true,
				class: 'bg-fb-pink-50',
			},
			{
				variant: 'outlined',
				color: 'slate',
				actived: true,
				class: 'bg-fb-slate-50',
			},
			{
				variant: 'outlined',
				color: 'grey',
				actived: true,
				class: 'bg-fb-grey-50',
			},
			{
				variant: 'outlined',
				color: 'lemon',
				actived: true,
				class: 'bg-fb-lemon-50',
			},

			// ACTIVED para TEXT
			{
				variant: 'text',
				color: 'primary',
				actived: true,
				class: 'bg-primary-50 font-semibold',
			},
			{
				variant: 'text',
				color: 'green',
				actived: true,
				class: 'bg-fb-green-50 font-semibold',
			},
			{
				variant: 'text',
				color: 'red',
				actived: true,
				class: 'bg-fb-red-50 font-semibold',
			},
			{
				variant: 'text',
				color: 'lilac',
				actived: true,
				class: 'bg-fb-lilac-50 font-semibold',
			},
			{
				variant: 'text',
				color: 'pink',
				actived: true,
				class: 'bg-fb-pink-50 font-semibold',
			},
			{
				variant: 'text',
				color: 'slate',
				actived: true,
				class: 'bg-fb-slate-50 font-semibold',
			},
			{
				variant: 'text',
				color: 'grey',
				actived: true,
				class: 'bg-fb-grey-50 font-semibold',
			},
			{
				variant: 'text',
				color: 'lemon',
				actived: true,
				class: 'bg-fb-lemon-50 font-semibold',
			},

			// ACTIVED para LINK (opcional)
			{
				variant: 'link',
				color: 'primary',
				actived: true,
				class: 'font-bold underline underline-offset-2',
			},
			{
				variant: 'link',
				color: 'green',
				actived: true,
				class: 'font-bold underline underline-offset-2',
			},
			{
				variant: 'link',
				color: 'red',
				actived: true,
				class: 'font-bold underline underline-offset-2',
			},
			{
				variant: 'link',
				color: 'lilac',
				actived: true,
				class: 'font-bold underline underline-offset-2',
			},
			{
				variant: 'link',
				color: 'pink',
				actived: true,
				class: 'font-bold underline underline-offset-2',
			},
			{
				variant: 'link',
				color: 'slate',
				actived: true,
				class: 'font-bold underline underline-offset-2',
			},
			{
				variant: 'link',
				color: 'grey',
				actived: true,
				class: 'font-bold underline underline-offset-2',
			},
			{
				variant: 'link',
				color: 'lemon',
				actived: true,
				class: 'font-bold underline underline-offset-2',
			},
		],
		defaultVariants: {
			variant: 'contained',
			color: 'primary',
			size: 'medium',
			corner: 'rounded',
		},
	},
);

export type ButtonConfigProps = VariantProps<typeof buttonConfig>;
