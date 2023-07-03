import { useState, useEffect } from 'react';
import { Box, IconButton, Textarea, FormLabel } from '@mui/joy';
import { FormatBold, FormatItalic } from '@mui/icons-material';
import { Stack } from '@mui/material';

export const EditTextarea = ({ taskDescription }) => {
  const [text, setText] = useState('');
  const [italic, setItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);

  const addEmoji = (emoji) => () => taskDescription?.setValue(`${taskDescription?.value}${emoji}`);

  return (
    <Stack sx={{ marginTop: '1rem', }}>
      <FormLabel>Description</FormLabel>
      <Textarea
        placeholder="Type in here…"
        value={text || taskDescription?.value}
        onChange={(event) => event.target.value ? taskDescription?.setValue(event.target.value) : setText(event.target.value)}
        minRows={2}
        maxRows={4}
        startDecorator={
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
              👍
            </IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('✅')}>
              ✅
            </IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('💲')}>
              💲
            </IconButton>
            <IconButton variant="outlined" color="neutral" onClick={addEmoji('🎉')}>
              🎉
            </IconButton>
          </Box>
        }
        endDecorator={
          <Box
            sx={{
              display: 'flex',
              gap: 'var(--Textarea-paddingBlock)',
              pt: 'var(--Textarea-paddingBlock)',
              borderTop: '1px solid',
              borderColor: 'divider',
              flex: 'auto',
            }}
          >
            <IconButton
              variant={isBold ? 'soft' : 'plain'}
              color={isBold ? 'primary' : 'neutral'}
              aria-pressed={isBold}
              onClick={() => setIsBold((bool) => !bool)}
            >
              <FormatBold />
            </IconButton>

            <IconButton
              variant={italic ? 'soft' : 'plain'}
              color={italic ? 'primary' : 'neutral'}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight: isBold ? "bold" : "",
          fontStyle: italic ? 'italic' : 'initial',
        }}
      />
    </Stack>
  );
}