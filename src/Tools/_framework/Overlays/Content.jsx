/**
 * External dependencies
 */
import React from 'react';
import { atom, useRecoilValue,useRecoilValueLoadable } from 'recoil';

/**
 * Internal dependencies
 */
import Tool from '../Tool';
import DoenetViewer from '../../../Viewer/DoenetViewer';
import { itemHistoryAtom} from '../../../_sharedRecoil/content';
const viewerContentDoenetMLAtom = atom({
  key: 'viewerContentDoenetMLAtom',
  default: { updateNumber: 0, doenetML: '' },
});

export default function Content({ doenetId = '', title }) {
  function DoenetViewerPanel() {

    const viewerDoenetML = useRecoilValue(viewerContentDoenetMLAtom);
    const versionHistory = useRecoilValueLoadable(itemHistoryAtom(doenetId))
    if (versionHistory.state === "loading"){ return null;}
    if (versionHistory.state === "hasError"){ 
      console.error(versionHistory.contents)
      return null;}
      let contentId = '';
      for (let version of versionHistory.contents.named){
        if(version?.isAssigned === '1'){
          contentId = version.contentId
        }            

      }
    let attemptNumber = 1;
    let requestedVariant = { index: attemptNumber };
    let assignmentId = 'myassignmentid';
    let solutionDisplayMode = 'button';

    return (
      <DoenetViewer
        key={'doenetviewer'}
        doenetML={viewerDoenetML?.doenetML}
        contentId={contentId}
        flags={{
          showCorrectness: true,
          readOnly: false,
          solutionDisplayMode: solutionDisplayMode,
          showFeedback: true,
          showHints: true,
        }}
        attemptNumber={attemptNumber}
        doenetId={doenetId}
        allowLoadPageState={true}
        allowSavePageState={true}
        allowLocalPageState={true}
        allowSaveSubmissions={true}
        allowSaveEvents={true}
        requestedVariant={requestedVariant}
      />
    );
  }
  return (
    <Tool>
      <headerPanel title={title} />

      <mainPanel>
        <div style={{ overflowY: 'scroll', height: 'calc(100vh - 84px)' }}>
          <DoenetViewerPanel />
        </div>
      </mainPanel>
    </Tool>
  );
}
