import create from 'zustand';
import React, { useRef } from 'react';
import { Box, Center, Icon } from '@chakra-ui/react';
import { CgMaximize } from 'react-icons/cg';
import produce from 'immer';

export const usePondLinkStore = create((set, get) => ({
  pgDash: { tags: {} },
  pgFrogeX: { tags: {} },
  pgEcoAct: { tags: {} },
  pgSpshps: { tags: {} },
  pgGament: { tags: {} },
  pgNFT: { tags: {} },
  pgXchang: { tags: {} },
  pgCalcs: { tags: {} },
  plinkMinimize: async (pageName, pondName) => {
    if(!get()[pageName].tags[pondName]){
      set((produce((s) => {s[pageName].tags[pondName]={}})))
    }
    set(produce((s) => { s[pageName].tags[pondName].plinkify = true }))
  },
  plinkMaximize: async (pageName, pondName) => {
    set(produce((s) => { s[pageName].tags[pondName].plinkify = false }))
  },
}));

const egPagesObj = {
  pgDash: {
    tags: {
      ['Network Vitals']: {
        pondRef: {},
        plinkify:false
      },
      ['FrogeX Dividends']: {
        pondRef: {},
        plinkify:false
      }
    }
  }
};

export function PondLinkTagRow(props) {
  const { pondLinkPg, } = props;
  const tags = usePondLinkStore(s => s[pondLinkPg].tags);
  const rowStyles = {w:"100%", h:"30px", display:'flex',flexWrap:'wrap',gap:'10px',mb:'10px'}
  const tagStyles = {bgColor:"gray.800", borderRadius:'30px',px:'10px', cursor:'pointer'}
  const maximize=(pg,pnd)=>{usePondLinkStore.getState().plinkMaximize(pg,pnd)}
  return (
    <Box id={`TagRow-${pondLinkPg}`} sx={rowStyles}>
      {Object.entries(tags).map(([k,v]) => v.plinkify && (
        <Center sx={tagStyles}
                key={pondLinkPg+k}
                onClick={()=>maximize(pondLinkPg, k)}>
          {k}&nbsp;<CgMaximize/>
        </Center>
      ))}
    </Box>
  );
}
