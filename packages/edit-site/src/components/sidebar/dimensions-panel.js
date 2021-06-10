/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	__experimentalBlockSupportPanel as BlockSupportPanel,
	__experimentalBoxControl as BoxControl,
	__experimentalUseCustomUnits as useCustomUnits,
} from '@wordpress/components';
import { __experimentalUseCustomSides as useCustomSides } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useSetting } from '../editor/utils';

export function useHasDimensionsPanel( context ) {
	const hasGap = useHasGap( context );
	const hasPadding = useHasPadding( context );
	const hasMargin = useHasMargin( context );

	return hasGap || hasPadding || hasMargin;
}

function useHasGap( { name, supports } ) {
	const settings = useSetting( 'spacing.customGap', name );

	return settings && supports.includes( 'gap' );
}

function useHasPadding( { name, supports } ) {
	const settings = useSetting( 'spacing.customPadding', name );

	return settings && supports.includes( 'padding' );
}

function useHasMargin( { name, supports } ) {
	const settings = useSetting( 'spacing.customMargin', name );

	return settings && supports.includes( 'margin' );
}

function filterValuesBySides( values, sides ) {
	if ( ! sides ) {
		// If no custom side configuration all sides are opted into by default.
		return values;
	}

	// Only include sides opted into within filtered values.
	const filteredValues = {};
	sides.forEach( ( side ) => ( filteredValues[ side ] = values[ side ] ) );

	return filteredValues;
}

export default function DimensionsPanel( { context, getStyle, setStyle } ) {
	const { name } = context;
	const showGapControl = useHasGap( context );
	const showPaddingControl = useHasPadding( context );
	const showMarginControl = useHasMargin( context );
	const units = useCustomUnits( {
		availableUnits: useSetting( 'spacing.units', name ) || [
			'%',
			'px',
			'em',
			'rem',
			'vw',
		],
	} );

	// Gap.
	const gapValues = getStyle( name, 'gap' );
	const gapSides = useCustomSides( name, 'gap' );

	const setGapValues = ( newGapValues ) => {
		const gap = filterValuesBySides( newGapValues, gapSides );
		// TODO: This is currently broken, it'll need to convert the sides to `row` and `column` values.
		setStyle( name, 'gap', gap );
	};
	const resetGapValue = () => setGapValues( {} );
	const hasGapValue = () => gapValues && Object.keys( gapValues ).length;

	const paddingValues = getStyle( name, 'padding' );
	const paddingSides = useCustomSides( name, 'padding' );

	const setPaddingValues = ( newPaddingValues ) => {
		const padding = filterValuesBySides( newPaddingValues, paddingSides );
		setStyle( name, 'padding', padding );
	};
	const resetPaddingValue = () => setPaddingValues( {} );
	const hasPaddingValue = () =>
		paddingValues && Object.keys( paddingValues ).length;

	const marginValues = getStyle( name, 'margin' );
	const marginSides = useCustomSides( name, 'margin' );

	const setMarginValues = ( newMarginValues ) => {
		const margin = filterValuesBySides( newMarginValues, marginSides );
		setStyle( name, 'margin', margin );
	};
	const resetMarginValue = () => setMarginValues( {} );
	const hasMarginValue = () =>
		marginValues && Object.keys( marginValues ).length;

	const resetAll = () => {
		resetPaddingValue();
		resetMarginValue();
	};

	return (
		<BlockSupportPanel
			label={ __( 'Dimensions options' ) }
			title={ __( 'Dimensions' ) }
			resetAll={ resetAll }
		>
			{ showPaddingControl && (
				<BoxControl
					values={ paddingValues }
					onChange={ setPaddingValues }
					label={ __( 'Padding' ) }
					sides={ paddingSides }
					units={ units }
					hasValue={ hasPaddingValue }
					reset={ resetPaddingValue }
					allowReset={ false }
					isShownByDefault={ true }
				/>
			) }
			{ showMarginControl && (
				<BoxControl
					values={ marginValues }
					onChange={ setMarginValues }
					label={ __( 'Margin' ) }
					sides={ marginSides }
					units={ units }
					hasValue={ hasMarginValue }
					reset={ resetMarginValue }
					allowReset={ false }
					isShownByDefault={ true }
				/>
			) }
			{ showGapControl && (
				<BoxControl
					values={ gapValues }
					onChange={ setGapValues }
					label={ __( 'Gap' ) }
					sides={ gapSides }
					units={ units }
					hasValue={ hasGapValue }
					reset={ resetGapValue }
					allowReset={ false }
					isShownByDefault={ true }
				/>
			) }
		</BlockSupportPanel>
	);
}
