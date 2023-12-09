import * as Dialog from '@radix-ui/react-dialog'

export const ResponsiveCanva = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] shadow-black hover:bg-vanille focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
        Edit profile
      </button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <Dialog.Title className="m-0 text-[17px] font-medium text-black">Edit profile</Dialog.Title>
        <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-black">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px] text-black" htmlFor="name">
            Name
          </label>
          <input
            className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-black outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            id="name"
            defaultValue="Pedro Duarte"
          />
        </fieldset>
        <fieldset className="mb-[15px] flex items-center gap-5">
          <label className="w-[90px] text-right text-[15px] text-black" htmlFor="username">
            Username
          </label>
          <input
            className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-black outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            id="username"
            defaultValue="@peduarte"
          />
        </fieldset>
        <div className="mt-[25px] flex justify-end">
          <Dialog.Close asChild>
            <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              Save changes
            </button>
          </Dialog.Close>
        </div>
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
