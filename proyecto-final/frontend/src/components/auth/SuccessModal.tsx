import Button from "../ui/Button"

interface SuccessModalProps {
  title?: string
  message?: string
  emailMessage?: string
  confirmText?: string
  onConfirm: () => void
}

export default function SuccessModal({
  title = "Cuenta creada exitosamente!",
  message,
  /*   emailMessage = "Por favor revise su correo electrónico para confirmar su cuenta.", */
  confirmText = "Ir a Iniciar Sesión",
  onConfirm,
}: SuccessModalProps): JSX.Element {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-xl bg-surface p-6 text-white text-center shadow-lg border border-white">
        <h2 className="mb-3 text-xl font-bold">{title}</h2>

        <p className="mb-6 text-textSecondary">{message}</p>
        {/*         <p className="mb-6 text-textSecondary">{emailMessage}</p> */}

        <Button onClick={onConfirm}> {confirmText}</Button>
      </div>
    </div>
  )
}
