import React from 'react';
import parse from 'html-react-parser';
import {usePluginData} from '@docusaurus/useGlobalData';

// Components returns raw html data from plugin. Data needs to be HTML string! (use remark)
export default function HTMLPluginData ({ pluginName, dataFieldName }) {
    const data = usePluginData(pluginName) as any;
    return (
        <>
        {parse(data[dataFieldName])}
        </>
    )
}