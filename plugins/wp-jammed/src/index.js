import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useEntityProp } from '@wordpress/core-data';

const editBlockStyle = {
	backgroundColor: '#900',
	color: '#fff',
	padding: '20px',
};

const account = useEntityProp( 'root', 'general', 'jammed_account' );

registerBlockType( 'wp-jammed/booking-block', {
	title: __( 'Jammed Bookings', 'wp-jammed' ),
	icon: 'universal-access-alt',
	category: 'layout',

	edit() {
		return (
			<div style={ editBlockStyle }>
				Jammed booking block
			</div>
		);
	},
	save() {
		return (
			<jammed-bookings account={ account }>
			</jammed-bookings>
		);
	},
} );
