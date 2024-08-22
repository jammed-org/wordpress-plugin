import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

registerBlockType('jammed-booking/widget', {
    title: 'Jammed Booking Widget',
    icon: 'calendar',
    category: 'widgets',
    attributes: {
        account: {
            type: 'string',
            default: '',
        },
    },
    edit: function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps();
        const [subdomain, setSubdomain] = useState(attributes.account);

        useEffect(() => {
            apiFetch({ path: '/wp/v2/settings' }).then((settings) => {
                if (settings.jammed_account_subdomain && !subdomain) {
                    setSubdomain(settings.jammed_account_subdomain);
                    setAttributes({ account: settings.jammed_account_subdomain });
                }
            });
        }, []);

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Jammed Booking Settings">
                        <TextControl
                            label="Account Subdomain"
                            value={subdomain}
                            onChange={(value) => {
                                setSubdomain(value);
                                setAttributes({ account: value });
                            }}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <p>Jammed Booking Widget (Account: {subdomain || 'Not set'})</p>
                    {subdomain && <jammed-bookings account={subdomain}></jammed-bookings>}
                </div>
            </>
        );
    },
    save: function Save() {
        return null; // Dynamic block, render on PHP side
    },
});
