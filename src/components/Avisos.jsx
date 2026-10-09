import { useEffect } from 'react'

// Aviso individual. O useEffect abaixo roda quando o componente é montado
// na tela e agenda o fechamento automático. O return do useEffect é
// executado quando o componente é desmontado, cancelando o agendamento.
function Aviso({ id, texto, aoFechar }) {
    useEffect(function () {
        const tempo = setTimeout(function () {
            aoFechar(id)
        }, 3000)

        return function () {
            clearTimeout(tempo)
        }
    }, [id])

    return (
        <div className="toast-custom" role="status">
            {texto}
        </div>
    )
}

// Lista de avisos exibida no canto da tela.
function Avisos({ lista, aoFechar }) {
    return (
        <div id="toast-container" aria-live="polite">
            {lista.map(function (aviso) {
                return (
                    <Aviso
                        key={aviso.id}
                        id={aviso.id}
                        texto={aviso.texto}
                        aoFechar={aoFechar}
                    />
                )
            })}
        </div>
    )
}

export default Avisos
