import React from 'react';
import styled from 'styled-components';

const StickyFooter = styled.footer`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
`

function Footer(props) {
    return (
        <StickyFooter>
            <div className='text-muted'>
                This is the footer
            </div>
        </StickyFooter>
    )
}

export default Footer;