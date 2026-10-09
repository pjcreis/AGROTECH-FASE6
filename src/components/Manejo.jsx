import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatCard from './StatCard.jsx'

// Componente filho: uma atividade do passo a passo.
// O texto do detalhe vem do método detalhar(), que cada subclasse de
// Tarefa implementa do seu jeito.
function ItemTarefa({ idPlantio, tarefa, diasPassados, aoAlternar, aoRemover }) {
    const chips = {
        'Rega': 'chip chip-azul',
        'Adubação': 'chip chip-amarelo',
        'Inspeção': 'chip chip-verde',
        'Outra': 'chip chip-cinza'
    }

    const atrasada = tarefa.estaAtrasada(diasPassados)
    let classe = 'item-tarefa'
    if (tarefa.concluida) classe = classe + ' concluida'
    if (atrasada) classe = classe + ' atrasada'

    return (
        <li className={classe}>
            <span className="dia-tarefa" aria-hidden="true">Dia {tarefa.diaPrevisto}</span>

            <label className="tarefa-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={tarefa.concluida}
                    onChange={function () { aoAlternar(idPlantio, tarefa.id) }}
                />
                <span>
                    <span className="tarefa-descricao">{tarefa.descricao}</span>
                    <span className="texto-suave tarefa-detalhe">{tarefa.detalhar()}</span>
                </span>
            </label>

            <div className="tarefa-acoes">
                {atrasada && <span className="chip chip-terra">Em atraso</span>}
                <span className={chips[tarefa.tipo()]}>{tarefa.rotuloOcorrencia()}</span>
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={function () { aoRemover(idPlantio, tarefa.id) }}
                    aria-label={`Remover ${tarefa.descricao} do dia ${tarefa.diaPrevisto}`}
                >
                    Remover
                </button>
            </div>
        </li>
    )
}

// Componente filho: formulário para acrescentar uma atividade ao plano.
function FormTarefa({ idPlantio, cicloDias, aoAdicionar }) {
    const [tipo, setTipo] = useState('outra')
    const [descricao, setDescricao] = useState('')
    const [dia, setDia] = useState('')
    const [repetir, setRepetir] = useState('')
    const [detalhe, setDetalhe] = useState('')
    const [erro, setErro] = useState('')

    const rotulos = {
        rega: { campo: 'Volume em litros', dica: 'Exemplo: 1.5', obrigatorio: true },
        adubacao: { campo: 'Tipo de adubo', dica: 'Exemplo: orgânico', obrigatorio: true },
        inspecao: { campo: 'O que observar', dica: 'Exemplo: sinais de praga', obrigatorio: false },
        outra: { campo: 'Observação', dica: 'Opcional', obrigatorio: false }
    }

    function enviar() {
        if (descricao.trim() === '') {
            setErro('Descreva a atividade.')
            return
        }
        if (dia === '' || Number(dia) <= 0) {
            setErro('Informe em que dia do ciclo ela acontece.')
            return
        }
        if (Number(dia) > cicloDias) {
            setErro(`O ciclo desta cultura tem ${cicloDias} dias.`)
            return
        }
        if (repetir !== '' && Number(repetir) <= 0) {
            setErro('O intervalo de repetição precisa ser maior que zero.')
            return
        }
        if (rotulos[tipo].obrigatorio && detalhe.trim() === '') {
            setErro(`Preencha o campo ${rotulos[tipo].campo.toLowerCase()}.`)
            return
        }

        setErro('')
        aoAdicionar(idPlantio, tipo, descricao.trim(), detalhe.trim(), Number(dia), repetir === '' ? 0 : Number(repetir))
        setDescricao('')
        setDetalhe('')
        setDia('')
        setRepetir('')
    }

    return (
        <div className="form-tarefa">
            <div className="grupo-titulo mb-2">Acrescentar atividade ao plano</div>
            <div className="row g-2">
                <div className="col-md-3">
                    <label className="form-label" htmlFor={`tipo-${idPlantio}`}>Tipo</label>
                    <select
                        id={`tipo-${idPlantio}`}
                        className="form-select form-select-sm"
                        value={tipo}
                        onChange={function (e) { setTipo(e.target.value); setDetalhe('') }}
                    >
                        <option value="outra">Outra</option>
                        <option value="rega">Rega</option>
                        <option value="adubacao">Adubação</option>
                        <option value="inspecao">Inspeção</option>
                    </select>
                </div>

                <div className="col-md-5">
                    <label className="form-label" htmlFor={`desc-${idPlantio}`}>O que fazer</label>
                    <input
                        id={`desc-${idPlantio}`}
                        type="text"
                        className="form-control form-control-sm"
                        maxLength="60"
                        placeholder="Exemplo: Virar o vaso para o sol"
                        value={descricao}
                        onChange={function (e) { setDescricao(e.target.value) }}
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label" htmlFor={`dia-${idPlantio}`}>No dia</label>
                    <input
                        id={`dia-${idPlantio}`}
                        type="number"
                        className="form-control form-control-sm"
                        min="1"
                        max={cicloDias}
                        placeholder={`1 a ${cicloDias}`}
                        value={dia}
                        onChange={function (e) { setDia(e.target.value) }}
                    />
                </div>

                <div className="col-md-2">
                    <label className="form-label" htmlFor={`rep-${idPlantio}`}>Repetir a cada</label>
                    <input
                        id={`rep-${idPlantio}`}
                        type="number"
                        className="form-control form-control-sm"
                        min="1"
                        max="90"
                        placeholder="dias"
                        value={repetir}
                        onChange={function (e) { setRepetir(e.target.value) }}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label" htmlFor={`det-${idPlantio}`}>{rotulos[tipo].campo}</label>
                    <input
                        id={`det-${idPlantio}`}
                        type="text"
                        className="form-control form-control-sm"
                        maxLength="40"
                        placeholder={rotulos[tipo].dica}
                        value={detalhe}
                        onChange={function (e) { setDetalhe(e.target.value) }}
                    />
                </div>
            </div>

            <div className="d-flex align-items-center gap-3 mt-2 flex-wrap">
                <button type="button" className="btn btn-verde btn-sm" onClick={enviar}>
                    Adicionar ao plano
                </button>
                <span className="texto-suave" style={{ fontSize: '12px' }}>
                    Deixe o campo de repetição vazio para uma atividade única.
                </span>
                {erro !== '' && <span className="text-danger" style={{ fontSize: '13px' }}>{erro}</span>}
            </div>
        </div>
    )
}

// Componente filho: o passo a passo de um plantio, agrupado por semana.
function PlanoDoPlantio({ plantio, filtro, aoAlternarTarefa, aoAdicionarTarefa, aoRemoverTarefa }) {
    const semanaAtual = plantio.semanaAtual()
    const grupos = plantio.tarefasPorSemana()

    function passaNoFiltro(t) {
        if (filtro === 'pendentes') return t.estaPendente()
        if (filtro === 'atrasadas') return t.estaAtrasada(plantio.diasPassados)
        return true
    }

    const gruposVisiveis = grupos
        .map(function (g) {
            return { semana: g.semana, todas: g.tarefas, tarefas: g.tarefas.filter(passaNoFiltro) }
        })
        .filter(function (g) {
            return g.tarefas.length > 0
        })

    return (
        <div className="panel-card">
            <div className="panel-card-header">
                <h3>📋 Passo a passo do cultivo</h3>
                <span className="texto-suave" style={{ fontSize: '12px' }}>
                    {plantio.tarefas.length} atividades em {plantio.cultura.cicloDias} dias
                </span>
            </div>

            <div className="panel-card-body">
                {gruposVisiveis.length === 0 ? (
                    <p className="texto-suave mb-3">Nenhuma atividade neste filtro.</p>
                ) : (
                    gruposVisiveis.map(function (g) {
                        const feitas = g.todas.filter(function (t) { return t.concluida }).length
                        const inicio = (g.semana - 1) * 7 + 1
                        const fim = g.semana * 7
                        const atual = g.semana === semanaAtual

                        return (
                            <div className="grupo-semana" key={g.semana}>
                                <div className={atual ? 'cabecalho-semana atual' : 'cabecalho-semana'}>
                                    <span className="grupo-titulo mb-0">
                                        Semana {g.semana} · dias {inicio} a {fim}
                                        {atual && <span className="chip chip-verde ms-2">Semana atual</span>}
                                    </span>
                                    <span className="texto-suave" style={{ fontSize: '12px' }}>
                                        {feitas} de {g.todas.length} concluídas
                                    </span>
                                </div>
                                <ul className="lista-tarefas">
                                    {g.tarefas.map(function (t) {
                                        return (
                                            <ItemTarefa
                                                key={t.id}
                                                idPlantio={plantio.id}
                                                tarefa={t}
                                                diasPassados={plantio.diasPassados}
                                                aoAlternar={aoAlternarTarefa}
                                                aoRemover={aoRemoverTarefa}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    })
                )}

                <FormTarefa
                    idPlantio={plantio.id}
                    cicloDias={plantio.cultura.cicloDias}
                    aoAdicionar={aoAdicionarTarefa}
                />
            </div>
        </div>
    )
}

// Página "Manejo", a nova funcionalidade da Fase 6.
function Manejo({ fazenda, aoAlternarTarefa, aoAdicionarTarefa, aoRemoverTarefa }) {
    const [selecionado, setSelecionado] = useState(0)
    const [filtro, setFiltro] = useState('todas')

    const total = fazenda.totalTarefas()
    const pendentes = fazenda.totalTarefasPendentes()
    const atrasadas = fazenda.totalTarefasAtrasadas()
    const concluidas = total - pendentes

    // Se o plantio escolhido foi removido, volta para o primeiro da lista.
    let plantio = fazenda.plantios.find(function (p) {
        return p.id === selecionado
    })
    if (!plantio) {
        plantio = fazenda.plantios[0]
    }

    const filtros = [
        { valor: 'todas', texto: 'Todas' },
        { valor: 'pendentes', texto: 'Pendentes' },
        { valor: 'atrasadas', texto: 'Em atraso' }
    ]

    return (
        <div>
            <header className="hero">
                <div className="container">
                    <h1 className="display-5 serif mb-3">Rotinas de manejo</h1>
                    <p>
                        Um passo a passo do plantio até a colheita, com as atividades na ordem
                        dos dias e as doses calculadas pela quantidade de mudas.
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
                                <StatCard valor={total} rotulo="Atividades no plano" cor="azul" />
                            </div>
                            <div className="col-6 col-md-3">
                                <StatCard valor={concluidas} rotulo="Já concluídas" cor="amarelo" />
                            </div>
                            <div className="col-6 col-md-3">
                                <StatCard valor={atrasadas} rotulo="Em atraso" cor="terra" />
                            </div>
                        </div>

                        {!plantio ? (
                            <div className="panel-card">
                                <div className="panel-card-body">
                                    <div className="estado-vazio">
                                        <span className="estado-vazio-icon">💧</span>
                                        <p className="mb-0">
                                            Nenhum plantio registrado.<br />
                                            Cadastre um plantio no <Link to="/painel">Painel</Link> e o passo a passo
                                            daquela cultura é criado automaticamente.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="seletor-plantio mb-3">
                                    {fazenda.plantios.map(function (p) {
                                        const ativo = p.id === plantio.id
                                        const pend = p.tarefasPendentes().length
                                        return (
                                            <button
                                                key={p.id}
                                                type="button"
                                                className={ativo ? 'botao-plantio ativo' : 'botao-plantio'}
                                                onClick={function () { setSelecionado(p.id) }}
                                            >
                                                <span className="bp-icone">{p.cultura.icone}</span>
                                                <span className="bp-texto">
                                                    <strong>{p.cultura.nome}</strong>
                                                    <small>{p.quantidadeMudas} mudas · {p.local}</small>
                                                </span>
                                                <span className={pend === 0 ? 'chip chip-verde' : 'chip chip-amarelo'}>
                                                    {pend === 0 ? 'Em dia' : `${pend} a fazer`}
                                                </span>
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="faixa-plantio mb-3">
                                    <div>
                                        <strong className="text-verde">
                                            {plantio.cultura.icone} {plantio.cultura.nome} · {plantio.local}
                                        </strong>
                                        <div className="texto-suave" style={{ fontSize: '13px' }}>
                                            Dia {plantio.diasPassados} de {plantio.cultura.cicloDias} do ciclo,
                                            faltam {plantio.diasRestantes()} dias para a colheita.
                                        </div>
                                        <div className="barra-progresso mt-2" style={{ maxWidth: '320px' }}>
                                            <div
                                                className={plantio.estaPronto() ? 'barra-fill pronto' : 'barra-fill'}
                                                style={{ width: `${plantio.calcularProgresso()}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                        <span className={plantio.cultura.temRotinaEspecifica() ? 'selo-rotina selo-especifica' : 'selo-rotina selo-basica'}>
                                            {plantio.cultura.temRotinaEspecifica() ? 'Rotina da cultura' : 'Rotina básica'}
                                        </span>
                                        {filtros.map(function (f) {
                                            const ativo = filtro === f.valor
                                            return (
                                                <button
                                                    key={f.valor}
                                                    type="button"
                                                    className={ativo ? 'btn btn-verde btn-sm' : 'btn btn-contorno-verde btn-sm'}
                                                    onClick={function () { setFiltro(f.valor) }}
                                                >
                                                    {f.texto}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                <PlanoDoPlantio
                                    plantio={plantio}
                                    filtro={filtro}
                                    aoAlternarTarefa={aoAlternarTarefa}
                                    aoAdicionarTarefa={aoAdicionarTarefa}
                                    aoRemoverTarefa={aoRemoverTarefa}
                                />
                            </>
                        )}

                    </div>
                </section>
            </main>
        </div>
    )
}

export default Manejo
