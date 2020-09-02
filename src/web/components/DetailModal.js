import React, {useState} from 'react'
import OutputTable from "./OutputTable";

const DetailModal = ({timestamp, statement, queryData}) => {

    const modal = document.getElementById('detail-modal')

    if(modal) {
        window.onclick = event => {
            if (event.target == modal) {
                modal.style.display = 'none'
            }
        }
    }

    return (
        <div id={'detail-modal'}>
            <div className={'detail-modal-content'}>
                <span className="detail-modal-close"
                      onClick={event => {
                          const modal = document.getElementById("detail-modal")
                          if (modal){
                              modal.style.display = 'none'
                          }
                      }}>
                    &times;
                </span>
                <p><b>Timestamp:</b></p>
                <p>{timestamp}</p>

                <p><b>Statement:</b></p>
                <p>{statement}</p>

                <p><b>Query Data:</b></p>
                <OutputTable data={queryData}/>
            </div>
        </div>
    )
}

export default DetailModal
