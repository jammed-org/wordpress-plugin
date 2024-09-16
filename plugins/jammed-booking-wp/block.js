import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

registerBlockType('jammed-booking/widget', {
    title: 'Jammed Booking Widget',
    icon: 'calendar',
    category: 'widgets',
    attributes: {
        account: {
            type: 'string',
            default: ''
        },
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps();
        const [subdomain, setSubdomain] = useState(attributes.account);

        useEffect(() => {
            apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
                if (settings.jammed_account_subdomain) {
                    setSubdomain(settings.jammed_account_subdomain);
                    setAttributes({ account: settings.jammed_account_subdomain });
                }
            });
        }, []);

        return (
            <div {...blockProps}>
                <TextControl
                    label="Jammed Account Subdomain"
                    value={subdomain}
                    onChange={(value) => {
                        setSubdomain(value);
                        setAttributes({ account: value });
                    }}
                />
                <div>
                    <p>Jammed Booking Widget Preview:</p>
                    <jammed-bookings account={subdomain}></jammed-bookings>
                </div>
            </div>
        );
    },
    save: function Save({ attributes }) {
        return (
            <jammed-bookings account={attributes.account}></jammed-bookings>
        );
    },
});