/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	BlockControls,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { close as closeIcon } from '@wordpress/icons';
import { Button, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function OverlayEdit( {
	attributes,
	isSelected,
	setAttributes,
} ) {
	const [ overlayContext, setOverlayContext ] = useState( 'button' );
	const blockProps = useBlockProps();

	const { overlayButtonContent } = attributes;

	const innerClasses = classnames( 'wp-block-overlay__content', {
		'wp-block-overlay__content--show': overlayContext === 'overlay',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: innerClasses },
		{
			orientation: 'vertical',
			placeholder: isSelected ? (
				<p>{ __( 'Click plus to add' ) }</p>
			) : (
				<p>{ __( 'Content.' ) }</p>
			),
			__experimentalLayout: {
				type: 'default',
				alignments: [],
			},
		}
	);
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						onClick={ () => setOverlayContext( 'button' ) }
					>
						{ __( 'Button' ) }
					</ToolbarButton>
					<ToolbarButton
						onClick={ () => setOverlayContext( 'overlay' ) }
					>
						{ __( 'Overlay' ) }
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>
			<div { ...blockProps }>
				<div className="wp-block-overlay__button">
					<RichText
						tagName="div"
						aria-label={ __( 'Overlay button' ) }
						placeholder={ __( 'Add button text' ) }
						value={ overlayButtonContent }
						onChange={ ( value ) =>
							setAttributes( { overlayButtonContent: value } )
						}
						withoutInteractiveFormatting
					/>
				</div>
				<div { ...innerBlocksProps }>
					<Button
						className="wp-block-overlay__close-button"
						icon={ closeIcon }
						onClick={ () => setOverlayContext( 'button' ) }
					/>
				</div>
			</div>
		</>
	);
}
