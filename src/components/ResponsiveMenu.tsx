import { useState, type PropsWithChildren } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export const ResponsiveMenu = (props: PropsWithChildren) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="fixed bottom-6 left-1/2 aspect-square -translate-x-1/2 rounded-full bg-vanille p-2 font-bold text-white shadow-md md:hidden"
        onClick={() => setOpen(true)}
      >
        Menu
      </button>
      <Drawer open={open} onOpenChange={setOpen}>
        {props.children}
      </Drawer>
    </>
  )
}

type DrawerProps = {
  open: boolean
  onOpenChange(open: boolean): void
}

const Drawer = ({ children, open, onOpenChange }: PropsWithChildren<DrawerProps>) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=closed]:animate-overlayHide fixed inset-0 bg-black data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="data-[state=closed]:animate-contentHide fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-black hover:bg-black focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
              aria-label="Close"
            >
              <i className="icon-close" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
