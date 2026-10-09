import { useState } from 'react'
import { culturas } from '../dados/culturas.js'

function CardCultura({ cultura, aoVerDetalhes }) {
    const chip = cultura.ehFacil() ? 'chip chip-verde' : 'chip chip-amarelo'

    return (
        <div className="col-md-6 col-lg-3">
            <div className="card h-100">
                <div className="card-body">
                    <div className="icone-card">{cultura.icone}</div>
                    <h3 className="h5 card-title mb-1">{cultura.nome}</h3>
                    <div className="mb-2 d-flex gap-1 flex-wrap">
                        <span className={chip}>{cultura.dificuldade}</span>
                        <span className={cultura.temRotinaEspecifica() ? 'selo-rotina selo-especifica' : 'selo-rotina selo-basica'}>
                            {cultura.temRotinaEspecifica() ? 'Rotina própria' : 'Rotina básica'}
                        </span>
                    </div>
                    <p className="texto-suave mb-3" style={{ fontSize: '13px' }}>
                        {cultura.descricao()}
                    </p>
                    <button
                        type="button"
                        className="btn btn-contorno-verde btn-sm w-100"
                        onClick={function () { aoVerDetalhes(cultura) }}
                    >
                        Ver detalhes
                    </button>
                </div>
            </div>
        </div>
    )
}

function DetalheCultura({ cultura, aoVoltar }) {
    return (
        <div className="col-12">
            <div className="panel-card">
                <div className="panel-card-header">
                    <h3>{cultura.icone} {cultura.nome}</h3>
                    <button type="button" className="btn btn-contorno-verde btn-sm" onClick={aoVoltar}>
                        Voltar ao guia
                    </button>
                </div>
                <div className="panel-card-body">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <strong className="text-verde">Ciclo</strong>
                            <div className="texto-suave">{cultura.cicloDias} dias</div>
                        </div>
                        <div className="col-md-3">
                            <strong className="text-verde">Sol</strong>
                            <div className="texto-suave">{cultura.sol}</div>
                        </div>
                        <div className="col-md-3">
                            <strong className="text-verde">Água</strong>
                            <div className="texto-suave">{cultura.agua}</div>
                        </div>
                        <div className="col-md-3">
                            <strong className="text-verde">Dificuldade</strong>
                            <div className="texto-suave">{cultura.dificuldade}</div>
                        </div>
                    </div>
                    <hr />
                    <p className="mb-2"><strong className="text-verde">Dica: </strong>{cultura.dica}</p>
                    <p className="texto-suave mb-0" style={{ fontSize: '13px' }}>
                        {cultura.temRotinaEspecifica()
                            ? 'Esta cultura tem rotina de manejo própria. Ao registrar um plantio, as tarefas e as doses são criadas de acordo com ela.'
                            : 'Esta cultura ainda usa a rotina básica de manejo. A receita própria entra em uma próxima versão do sistema.'}
                    </p>
                </div>
            </div>
        </div>
    )
}

function Guia() {
    const [busca, setBusca] = useState('')
    const [selecionada, setSelecionada] = useState(null)

    const encontradas = culturas.filter(function (c) {
        return c.nome.toLowerCase().indexOf(busca.trim().toLowerCase()) !== -1
    })

    return (
        <div>
            <header className="hero">
                <div className="container">
                    <h1 className="display-5 serif mb-3">Guia de Culturas</h1>
                    <p>
                        Consulte as culturas indicadas para o cultivo vertical. Veja ciclo, necessidade
                        de sol e água, nível de dificuldade e uma dica prática para cada uma.
                    </p>
                </div>
            </header>

            <main>
                <section className="secao">
                    <div className="container">

                        {selecionada === null && (
                            <div className="row justify-content-center mb-4">
                                <div className="col-lg-6">
                                    <label htmlFor="busca-cultura" className="form-label">Buscar cultura</label>
                                    <input
                                        type="text"
                                        id="busca-cultura"
                                        className="form-control"
                                        placeholder="Digite o nome, por exemplo: alface"
                                        value={busca}
                                        onChange={function (evento) { setBusca(evento.target.value) }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="row g-4">
                            {selecionada !== null ? (
                                <DetalheCultura
                                    cultura={selecionada}
                                    aoVoltar={function () { setSelecionada(null) }}
                                />
                            ) : encontradas.length === 0 ? (
                                <div className="col-12">
                                    <div className="estado-vazio">
                                        <span className="estado-vazio-icon">🔍</span>
                                        <p className="mb-0">Nenhuma cultura encontrada para essa busca.</p>
                                    </div>
                                </div>
                            ) : (
                                encontradas.map(function (c) {
                                    return (
                                        <CardCultura
                                            key={c.id}
                                            cultura={c}
                                            aoVerDetalhes={setSelecionada}
                                        />
                                    )
                                })
                            )}
                        </div>

                    </div>
                </section>
            </main>
        </div>
    )
}

export default Guia
