import React from 'react'

import PDFViewer from 'pdf-viewer-reactjs'

const ExamplePDFViewer = () => {
    return (
        <PDFViewer
            document={{
                url: 'http://municipioscolombia.co/Huila/neiva/FORMULARIO%20ICA%20NEIVA.pdf',
            }}
        />
    )
}

export default ExamplePDFViewer