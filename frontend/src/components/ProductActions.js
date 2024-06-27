import * as React from 'react';
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import PrintIcon from '@mui/icons-material/Print';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'relative', // Cambiar a relativo para que se posicione dentro del flujo normal
    margin: 'auto', // Centrar horizontalmente
    mt: 2, // Añadir margen superior
}));

const ProductActions = ({ onExportCSV, onPrint }) => (
    <StyledSpeedDial
        ariaLabel="Product actions"
        icon={<SpeedDialIcon />}
        direction="right"
    >
        <SpeedDialAction
            key="export-csv"
            icon={<FileCopyIcon />}
            tooltipTitle="Export CSV"
            onClick={onExportCSV} // Llama a la función de exportación CSV
        />
        <SpeedDialAction
            key="print"
            icon={<PrintIcon />}
            tooltipTitle="Print"
            onClick={onPrint} // Llama a la función de impresión
        />
    </StyledSpeedDial>
);

export default ProductActions;
