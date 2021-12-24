import React from 'react';
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export function TableActions({ actions }) {
  const { show, edit, del } = actions;
  return(
    <React.Fragment>
      {show &&
        <Button
          variant="contained"
          onClick={show.handle}
          sx={{ mr: 1 }}
        >
          Show
        </Button>
      }
      { edit &&
        <Button
          variant="contained"
          onClick={edit.handle}
          sx={{ mr: 1 }}
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
          sx={{ mr: 1 }}
        >
          Delete
        </LoadingButton>
      }
    </React.Fragment>
  )
}
