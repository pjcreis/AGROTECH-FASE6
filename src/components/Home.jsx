import { Link } from 'react-router-dom'

// Página inicial.
function Home() {
    return (
        <div>
            <header className="hero">
                <div className="container">
                    <div className="row align-items-center g-4">
                        <div className="col-lg-8">
                            <h1 className="display-5 serif mb-3">Sua horta vertical, organizada do plantio à colheita.</h1>
                            <p className="mb-4">
                                Uma solução simples para condomínios, escolas, centros comunitários e projetos sociais
                                que querem produzir alimentos frescos em pequenos espaços, com mais controle e previsibilidade.
                            </p>
                            <a
                                href="https://www.youtube.com/watch?v=DsxkLdnpaEc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-verde"
                            >
                                Assistir ao pitch da Fase 6
                                <span className="visually-hidden"> (abre em nova aba)</span>
                            </a>
                        </div>
                        <div className="col-lg-4">
                            <img
                                src="https://images.unsplash.com/photo-1682629088851-daa687df7f7f?w=800&q=80&auto=format&fit=crop"
                                alt="Torre de cultivo vertical com mudas de hortaliças"
                                className="img-fluid rounded hero-img"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main>
                <section className="secao">
                    <div className="container">
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-6">
                                <h2 className="titulo-secao">Pouco espaço, mais organização.</h2>
                                <p className="texto-suave">
                                    A Micro-Fazenda Vertical transforma varandas, áreas comuns, quintais e espaços institucionais
                                    em pontos de produção local de alimentos. O sistema apoia a operação para que a horta
                                    não dependa de anotações soltas ou da memória de quem está cuidando no dia.
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h3 className="h5 card-title">Mais controle</h3>
                                                <p className="texto-suave mb-0">Informações de cultivo reunidas em um só lugar.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h3 className="h5 card-title">Mais previsibilidade</h3>
                                                <p className="texto-suave mb-0">Acompanhe o que está crescendo e o que se aproxima da colheita.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h3 className="h5 card-title">Rotina organizada</h3>
                                                <p className="texto-suave mb-0">Rega, adubação e inspeção com periodicidade definida por plantio.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h3 className="h5 card-title">Menos desperdício</h3>
                                                <p className="texto-suave mb-0">Controle o que está crescendo e o que se aproxima da colheita para evitar desperdícios.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="secao bg-verde-suave">
                    <div className="container text-center">
                        <h2 className="titulo-secao">Uma ferramenta simples para dar continuidade à produção.</h2>
                        <p className="texto-suave mb-4">
                            Veja como o sistema organiza culturas, plantios, manejo e colheitas.
                        </p>
                        <div className="d-flex gap-3 justify-content-center flex-wrap">
                            <Link to="/sistema" className="btn btn-verde">Ver funcionalidades</Link>
                            <Link to="/manejo" className="btn btn-contorno-verde">Conhecer as rotinas de manejo</Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Home
