import React from 'react';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export function TableActions({ actions }) {
  const { edit, del } = actions;
  return(
    <React.Fragment>
      { edit &&
        <Button
          variant="contained"
          onClick={edit.handle}
        >
          Edit
        </Button>
      }

      { del &&
        <LoadingButton
          variant="contained"
          loading={del.loader}
          onClick={del.handle}
          color="error"
          sx={{ ml: 1 }}
        >
          Delete
        </LoadingButton>
      }
    </React.Fragment>
  )
}
