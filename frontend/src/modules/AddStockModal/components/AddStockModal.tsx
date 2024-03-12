import React, {forwardRef, useState} from 'react';

interface Props {
}

const AddStockModal = forwardRef( ({}: Props, ref: any) => {
       
    return (
        <div ref={ref} className={'modal_container red_bg'}>
            <div className={'modal_content popup_modal modal_bg flex_row'}>
                <label className={'marg_lrs'}>Amount: </label>
                <input className={'marg_lrl'} type={'text'}/>
                <label className={'marg_lrl'}>Price: </label>
                <input className={'marg_lrl'} type={'text'}/>
                <input className={'marg_lrs'} type={'button'} value={'Add to Portfolio'}/>
            </div>
        </div>
    );
});

export default AddStockModal;