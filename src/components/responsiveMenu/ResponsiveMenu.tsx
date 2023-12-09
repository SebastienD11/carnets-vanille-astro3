import { useState, type PropsWithChildren } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

export const ResponsiveMenu = (props: PropsWithChildren) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        className="blle fixed bottom-6 left-1/2 aspect-square -translate-x-1/2 rounded-full bg-vanille/80 p-2 font-bold text-white shadow-md backdrop-blur md:hidden"
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
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed right-0 top-0 h-screen w-screen bg-black/80 text-white backdrop-blur focus:outline-none data-[state=closed]:translate-x-full data-[state=open]:-translate-x-0 data-[state=closed]:animate-responsiveMenuHide data-[state=open]:animate-responsiveMenuShow">
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center text-black focus:outline-none"
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
