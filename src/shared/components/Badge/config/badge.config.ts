import { cva, type VariantProps } from 'class-variance-authority';

export const badgeConfig = cva('leading-none flex', {
	variants: {
		variant: {
			contained: '',
			soft: '',
			outlined: 'border'
		},
		color: {
			primary: '',
			green: '',
			red: '',
			slate: '',
			grey: '',
			lemon: '',
			lilac: '',
			purple: '',
			pink: '',
		},
		size: {
			small: 'p-1 gap-1.5 text-xs',
			medium: 'p-2 gap-2 text-sm',
			large: 'p-3 gap-3 text-base',
		},
		corner: {
			rounded: 'rounded-[4px]',
			pill: 'rounded-full',
		},
	},
	compoundVariants: [
		// Cores fortes preenchidas
		{
			variant: 'contained',
			color: 'primary',
			class: 'bg-primary-500 text-white'
		},
		{
			variant: 'contained',
			color: 'lilac',
			class: 'bg-lilac-500 text-white'
		},
		{
			variant: 'contained',
			color: 'slate',
			class: 'bg-slate-500 text-white'
		},
		{
			variant: 'contained',
			color: 'green',
			class: 'bg-green-500 text-white'
		},
		{
			variant: 'contained',
			color: 'grey',
			class: 'bg-grey-500 text-white'
		},
		{
			variant: 'contained',
			color: 'lemon',
			class: 'bg-lemon-500 text-white'
		},
		{
			variant: 'contained',
			color: 'purple',
			class: 'bg-purple-500 text-white'
		},
		{
			variant: 'contained',
			color: 'red',
			class: 'bg-red-500'
		},
		// Cores soft preenchidas
		{
			variant: 'soft',
			color: 'green',
			class: 'bg-green-50 text-green-600 border border-green-300'
		},
		{
			variant: 'soft',
			color: 'grey',
			class: 'bg-grey-50 text-grey-600 border border-grey-300'
		},
		{
			variant: 'soft',
			color: 'lemon',
			class: 'bg-lemon-50 text-lemon-600 border border-lemon-300'
		},
		{
			variant: 'soft',
			color: 'lilac',
			class: 'bg-lilac-50 text-lilac-600 border border-lilac-300'
		},
		{
			variant: 'soft',
			color: 'pink',
			class: 'bg-pink-50 text-pink-600 border border-pink-300'
		},
		{
			variant: 'soft',
			color: 'primary',
			class: 'bg-primary-50 text-primary-600 border border-primary-300'
		},
		{
			variant: 'soft',
			color: 'purple',
			class: 'bg-purple-50 text-purple-600 border border-purple-300'
		},
		{
			variant: 'soft',
			color: 'red',
			class: 'bg-red-50 text-red-600 border border-red-300'
		},
		{
			variant: 'soft',
			color: 'slate',
			class: 'bg-slate-50 text-slate-600 border border-slate-300'
		},
		// Cores em outline
		{
			variant: 'outlined',
			color: 'green',
			class: 'text-green-600 border border-green-500'
		},
		{
			variant: 'outlined',
			color: 'grey',
			class: 'text-grey-600 border border-grey-500'
		},
		{
			variant: 'outlined',
			color: 'lemon',
			class: 'text-lemon-600 border border-lemon-500'
		},
		{
			variant: 'outlined',
			color: 'lilac',
			class: 'text-lilac-600 border border-lilac-500'
		},
		{
			variant: 'outlined',
			color: 'pink',
			class: 'text-pink-600 border border-pink-500'
		},
		{
			variant: 'outlined',
			color: 'primary',
			class: 'text-primary-600 border border-primary-500'
		},
		{
			variant: 'outlined',
			color: 'purple',
			class: 'text-purple-600 border border-purple-500'
		},
		{
			variant: 'outlined',
			color: 'red',
			class: 'text-red-600 border border-red-500'
		},
		{
			variant: 'outlined',
			color: 'slate',
			class: 'text-slate-600 border border-slate-500'
		},
	],
	defaultVariants: {
		variant: 'soft',
		corner: 'pill',
		color: 'primary',
		size: 'small'
	}
});

export type BadgeConfigProps = VariantProps<typeof badgeConfig>;
