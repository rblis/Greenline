import React from 'react';
import './RootStyles.css';
import './GridStyles.css';
import './FlexStyles.css';
import './FontStyles.css';
import './SpacingStyles.css'

import DashboardContainer from "../../../MainStockDashboard/components/DashboardContainer/DashboardContainer";

interface Props {
}

function Root({}: Props) {
    return (
        <div className={'root_background'}>
            <DashboardContainer/>
        </div>
    );
}

export default Root;