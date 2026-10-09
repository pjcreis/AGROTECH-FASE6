import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatCard from './StatCard.jsx'
import { culturas } from '../dados/culturas.js'

// Componente filho: formulário de registro de plantio.
// Guarda os campos no seu próprio useState e avisa o pai pela função
// recebida em props quando o usuário confirma.
function FormPlantio({ aoAdicionar }) {
    const [idCultura, setIdCultura] = useState('')
    const [mudas, setMudas] = useState('')
    const [local, setLocal] = useState('')
    const [erro, setErro] = useState('')

    function enviar() {
        if (idCultura === '') {
            setErro('Selecione uma cultura.')
            return
        }
        if (mudas === '' || Number(mudas) <= 0) {
            setErro('Informe uma quantidade de mudas maior que zero.')
            return
        }
        if (local.trim() === '') {
            setErro('Informe o local do plantio.')
            return
        }

        setErro('')
        aoAdicionar(idCultura, Number(mudas), local.trim())
        setIdCultura('')
        setMudas('')
        setLocal('')
    }

    return (
        <div className="panel-card h-100">
            <div className="panel-card-header">
                <h3>🪴 Registrar plantio</h3>
            </div>
            <div className="panel-card-body">
                <div className="mb-3">
                    <label htmlFor="plantio-cultura" className="form-label">Cultura</label>
                    <select
                        id="plantio-cultura"
                        className="form-select"
                        value={idCultura}
                        onChange={function (e) { setIdCultura(e.target.value) }}
                    >
                        <option value="">Selecione</option>
                        {culturas.map(function (c) {
                            return <option key={c.id} value={c.id}>{c.nome}</option>
                        })}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="plantio-mudas" className="form-label">Mudas</label>
                    <input
                        type="number"
                        id="plantio-mudas"
                        className="form-control"
                        min="1"
                        max="500"
                        placeholder="Exemplo: 10"
                        value={mudas}
                        onChange={function (e) { setMudas(e.target.value) }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="plantio-local" className="form-label">Local</label>
                    <input
                        type="text"
                        id="plantio-local"
                        className="form-control"
                        maxLength="50"
                        placeholder="Exemplo: Varanda"
                        value={local}
                        onChange={function (e) { setLocal(e.target.value) }}
                    />
                </div>
                <button type="button" className="btn btn-verde w-100" onClick={enviar}>
                    Adicionar plantio
                </button>
                {erro !== '' && <div className="text-danger mt-3" role="alert">{erro}</div>}
            </div>
        </div>
    )
}

// Componente filho: uma linha da tabela de plantios.
function LinhaPlantio({ plantio, aoColher, aoRemover }) {
    const pct = plantio.calcularProgresso()
    const fase = plantio.obterFase()

    let classeChip = 'chip chip-azul'
    if (fase === 'Pronto') classeChip = 'chip chip-verde'
    else if (fase === 'Crescendo') classeChip = 'chip chip-amarelo'

    const classeBarra = pct >= 100 ? 'barra-fill pronto' : 'barra-fill'
    const pendentes = plantio.tarefasPendentes().length
    const atrasadas = plantio.tarefasAtrasadas().length

    return (
        <tr>
            <td>
                <strong className="text-verde">{plantio.cultura.nome}</strong>
                <div className="texto-suave" style={{ fontSize: '12px' }}>
                    {plantio.quantidadeMudas} mudas · {plantio.local}
                </div>
            </td>
            <td><span className={classeChip}>● {fase}</span></td>
            <td style={{ minWidth: '140px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-suave)', marginBottom: '4px' }}>
                    {pct}% · {plantio.diasRestantes()} dias restantes
                </div>
                <div className="barra-progresso">
                    <div className={classeBarra} style={{ width: `${pct}%` }}></div>
                </div>
            </td>
            <td>
                <span className="texto-suave" style={{ fontSize: '12px' }}>
                    {pendentes} pendente{pendentes === 1 ? '' : 's'}
                </span>
                {atrasadas > 0 && (
                    <div><span className="chip chip-terra">{atrasadas} em atraso</span></div>
                )}
            </td>
            <td className="text-end">
                {plantio.estaPronto() && (
                    <button
                        type="button"
                        className="btn btn-verde btn-sm me-1"
                        onClick={function () { aoColher(plantio.id) }}
                    >
                        Colher
                    </button>
                )}
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={function () { aoRemover(plantio.id) }}
                >
                    Remover
                </button>
            </td>
        </tr>
    )
}

// Página "Painel".
function Painel({ fazenda, aoAdicionar, aoRemover, aoColher, aoSimular, aoLimpar }) {
    const vazio = fazenda.plantios.length === 0

    return (
        <div>
            <header className="hero">
                <div className="container">
                    <h1 className="display-5 serif mb-3">Painel de plantios</h1>
                    <p>
                        Registre plantios, simule a passagem do tempo e acompanhe cada ciclo
                        até a colheita.
                    </p>
                </div>
            </header>

            <main>
                <section className="secao">
                    <div className="container">

                        <div className="row g-3 mb-4">
                            <div className="col-6 col-md-3">
                                <StatCard valor={fazenda.plantios.length} rotulo="Plantios ativos" cor="verde" />
                            </div>
                            <div className="col-6 col-md-3">
                                <StatCard valor={fazenda.contarPorFase('Crescendo')} rotulo="Em crescimento" cor="amarelo" />
                            </div>
                            <div className="col-6 col-md-3">
                                <StatCard valor={fazenda.contarPorFase('Pronto')} rotulo="Prontos para colheita" cor="terra" />
                            </div>
                            <div className="col-6 col-md-3">
                                <StatCard valor={fazenda.colheitas.length} rotulo="Colheitas registradas" cor="azul" />
                            </div>
                        </div>

                        <div className="row g-4">
                            <div className="col-lg-4">
                                <FormPlantio aoAdicionar={aoAdicionar} />
                            </div>

                            <div className="col-lg-8">
                                <div className="panel-card">
                                    <div className="panel-card-header">
                                        <h3>🌱 Plantios em andamento</h3>
                                        <div className="d-flex gap-2 flex-wrap">
                                            <button
                                                type="button"
                                                className="btn btn-verde btn-sm"
                                                disabled={vazio}
                                                onClick={function () { aoSimular(7) }}
                                            >
                                                Simular 7 dias
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-contorno-verde btn-sm"
                                                disabled={vazio}
                                                onClick={aoLimpar}
                                            >
                                                Limpar tudo
                                            </button>
                                        </div>
                                    </div>
                                    <div className="panel-card-body p-0">
                                        {vazio ? (
                                            <div className="estado-vazio">
                                                <span className="estado-vazio-icon">🪴</span>
                                                <p className="mb-0">
                                                    Nenhum plantio registrado.<br />
                                                    Use o formulário ao lado para começar.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="tabela-plantios">
                                                    <thead>
                                                        <tr>
                                                            <th>Cultura</th>
                                                            <th>Fase</th>
                                                            <th>Progresso</th>
                                                            <th>Manejo</th>
                                                            <th className="text-end">Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fazenda.plantios.map(function (p) {
                                                            return (
                                                                <LinhaPlantio
                                                                    key={p.id}
                                                                    plantio={p}
                                                                    aoColher={aoColher}
                                                                    aoRemover={aoRemover}
                                                                />
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {!vazio && (
                                    <p className="texto-suave mt-3 mb-0" style={{ fontSize: '13px' }}>
                                        As tarefas de rega, adubação e inspeção de cada plantio ficam na
                                        página <Link to="/manejo">Manejo</Link>.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="row g-4 mt-1">
                            <div className="col-12">
                                <div className="panel-card">
                                    <div className="panel-card-header">
                                        <h3>🧺 Histórico de colheitas</h3>
                                    </div>
                                    <div className="panel-card-body p-0">
                                        {fazenda.colheitas.length === 0 ? (
                                            <div className="estado-vazio">
                                                <span className="estado-vazio-icon">🧺</span>
                                                <p className="mb-0">
                                                    Nenhuma colheita registrada ainda.<br />
                                                    Quando um plantio chegar a 100%, registre a colheita.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="tabela-plantios">
                                                    <thead>
                                                        <tr>
                                                            <th>Cultura</th>
                                                            <th>Quantidade</th>
                                                            <th>Local</th>
                                                            <th>Quando</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {fazenda.colheitas.slice().reverse().map(function (c) {
                                                            return (
                                                                <tr key={c.id}>
                                                                    <td><strong className="text-verde">{c.culturaNome}</strong></td>
                                                                    <td>{c.quantidade} mudas</td>
                                                                    <td>{c.local}</td>
                                                                    <td>{c.quando()}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        </div>
    )
}

export default Painel
