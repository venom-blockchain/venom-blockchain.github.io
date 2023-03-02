import React from 'react';
import {usePluginData} from '@docusaurus/useGlobalData';

export default function VEPsTable() {
  const {veps} = usePluginData('veps-data-generator') as any;
  return (
    <table>
      <thead>
        <tr>
          <th>VEP</th>
          <th>Title</th>
          <th>Author</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {veps.map(vep => {
          return (
            <tr>
              <td><a href={ `vep-${vep.VEP}` }>{ vep.VEP }</a></td>
              <td>{ vep.title }</td>
              <td>{ vep.author }</td>
              <td>{ vep.status }</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}