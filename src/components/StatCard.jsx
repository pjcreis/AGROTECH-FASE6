// Card de indicador, reutilizado pelo Painel e pela página de Manejo.
// Recebe por props o número, o rótulo e a cor da barra superior.
function StatCard({ valor, rotulo, cor }) {
    return (
        <div className={`stat-card stat-${cor}`}>
            <div className="stat-num">{valor}</div>
            <div className="stat-label">{rotulo}</div>
        </div>
    )
}

export default StatCard
