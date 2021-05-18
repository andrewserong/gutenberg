/**
 * WordPress dependencies
 */
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { close as closeIcon } from '@wordpress/icons';
import { Button } from '@wordpress/components';

export default function save( { attributes } ) {
	const { overlayButtonContent } = attributes;
	return (
		<div { ...useBlockProps.save() }>
			<div className="wp-block-overlay__button">
				<RichText.Content
					tagName="div"
					value={ overlayButtonContent }
				/>
			</div>
			<div className="wp-block-overlay__content">
				<Button
					className="wp-block-overlay__close-button"
					icon={ closeIcon }
				/>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
