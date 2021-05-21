/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		gridTemplateColumns,
		isStackedOnMobile,
		verticalAlignment,
	} = attributes;

	const className = classnames( {
		[ `are-vertically-aligned-${ verticalAlignment }` ]: verticalAlignment,
		[ `is-not-stacked-on-mobile` ]: ! isStackedOnMobile,
	} );

	return (
		<div
			{ ...useBlockProps.save( {
				className,
				style: { gridTemplateColumns },
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
