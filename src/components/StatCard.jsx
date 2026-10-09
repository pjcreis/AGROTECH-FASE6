function StatCard({ valor, rotulo, cor }) {
    return (
        <div className={`stat-card stat-${cor}`}>
            <div className="stat-num">{valor}</div>
            <div className="stat-label">{rotulo}</div>
        </div>
    )
}

export default StatCard
