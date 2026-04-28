import { Fab, Tooltip, Zoom } from '@mui/material'
import { WhatsApp as WhatsAppIcon } from '@mui/icons-material'
import { whatsappLinkWithText } from '@/lib/config'

type Props = { prefillMessage?: string }

export function FloatingWhatsapp({ prefillMessage }: Props) {
  const href = prefillMessage
    ? whatsappLinkWithText(prefillMessage)
    : whatsappLinkWithText('Hi! I am interested in CraftArt floral art.')

  return (
    <Zoom in>
      <Tooltip title="Message us on WhatsApp" placement="left">
        <Fab
          color="primary"
          component="a"
          href={href}
          target="_blank"
          rel="noopener"
          role="link"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: (t) => t.zIndex.fab,
          }}
          aria-label="WhatsApp"
        >
          <WhatsAppIcon />
        </Fab>
      </Tooltip>
    </Zoom>
  )
}
