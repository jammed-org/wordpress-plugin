import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

const blockStyle = {
	backgroundColor: '#900',
	color: '#fff',
	padding: '20px',
};

registerBlockType( 'wp-jammed/booking-block', {
	title: __( 'Jammed Bookings', 'wp-jammed' ),
	icon: 'universal-access-alt',
	category: 'layout',
	example: {},
	edit() {
		return (
			<div style={ blockStyle }>
				Hello World, step 1 (from the editor).
			</div>
		);
	},
	save() {
		return (
			<div style={ blockStyle }>
				Hello World, step 1 (from the frontend).
			</div>
		);
	},
} );
