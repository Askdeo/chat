import React, { useEffect } from 'react'

import { Loader, Dimmer } from 'semantic-ui-react';

const Spinner = () => {
    return (
        <Dimmer>
            <Loader size='huge' content='Preparing Chat ...'/>
        </Dimmer>
        
    )
}

export default Spinner;