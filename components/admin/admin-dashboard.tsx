"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Box,
  CirclePlus,
  ImagePlus,
  MoonStar,
  PencilLine,
  RefreshCcw,
  Search,
  SunMedium,
  X
} from "lucide-react";
import type { AdminDashboardData, Product, ProductClickAnalytics } from "@/lib/types";

type AdminDashboardProps = {
  initialData: AdminDashboardData;
  adminDisplayName: string;
};

type SortMode = "most-clicked" | "least-clicked" | "latest";
type ThemeMode = "dark" | "light";

function formatCount(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function formatDate(value: string | null) {
  if (!value) return "Sem atividade ainda";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

function createAnalyticsProduct(product: Product): ProductClickAnalytics {
  return {
    ...product,
    total_clicks: 0,
    affiliate_clicks: 0,
    last_clicked_at: null
  };
}

export function AdminDashboard({
  initialData,
  adminDisplayName
}: AdminDashboardProps) {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [sortMode, setSortMode] = useState<SortMode>("most-clicked");
  const [search, setSearch] = useState("");
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductClickAnalytics | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("louis-admin-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("louis-admin-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isCreateModalOpen && !editingProduct) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [editingProduct, isCreateModalOpen]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();
    const nextProducts = dashboardData.productAnalytics.filter((product) => {
      if (!normalizedSearch) return true;

      return (
        product.titulo.toLowerCase().includes(normalizedSearch) ||
        String(product.numero_achado).includes(normalizedSearch) ||
        product.categoria.toLowerCase().includes(normalizedSearch)
      );
    });

    nextProducts.sort((left, right) => {
      if (sortMode === "least-clicked") return left.total_clicks - right.total_clicks;
      if (sortMode === "latest") {
        return new Date(right.created_at).getTime() - new Date(left.created_at).getTime();
      }

      return right.total_clicks - left.total_clicks;
    });

    return nextProducts;
  }, [dashboardData.productAnalytics, deferredSearch, sortMode]);

  const maxClicks = filteredProducts[0]?.total_clicks ?? 0;
  const topButton = useMemo(
    () =>
      dashboardData.buttonAnalytics
        .slice()
        .sort((left, right) => right.total_clicks - left.total_clicks)[0] ?? null,
    [dashboardData.buttonAnalytics]
  );

  const openCreateModal = () => {
    setStatusMessage(null);
    setErrorMessage(null);
    setImageMode("url");
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (product: ProductClickAnalytics) => {
    setStatusMessage(null);
    setErrorMessage(null);
    setImageMode("url");
    setEditingProduct(product);
  };

  const closeEditModal = () => setEditingProduct(null);

  const handleCreateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (imageMode === "url") formData.delete("imageFile");
    if (imageMode === "upload") formData.delete("imageUrl");

    setIsSubmitting(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/products", { method: "POST", body: formData });
      const result = (await response.json()) as { error?: string; product?: Product };

      if (!response.ok || !result.product) {
        setErrorMessage(result.error ?? "Nao foi possivel cadastrar o produto.");
        return;
      }

      const nextProduct = createAnalyticsProduct(result.product);

      startTransition(() => {
        setDashboardData((current) => ({
          ...current,
          productAnalytics: [nextProduct, ...current.productAnalytics],
          totals: {
            ...current.totals,
            totalProducts: current.totals.totalProducts + 1
          }
        }));
      });

      form.reset();
      if (fileInputRef.current) fileInputRef.current.value = "";
      setImageMode("url");
      setStatusMessage("Produto cadastrado com sucesso.");
      setIsCreateModalOpen(false);
    } catch {
      setErrorMessage("Falha ao enviar o produto para o dashboard.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (imageMode === "url") formData.delete("imageFile");
    if (imageMode === "upload") formData.delete("imageUrl");

    setIsSubmitting(true);
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/products", { method: "PATCH", body: formData });
      const result = (await response.json()) as { error?: string; product?: Product };

      if (!response.ok || !result.product) {
        setErrorMessage(result.error ?? "Nao foi possivel atualizar o produto.");
        return;
      }

      startTransition(() => {
        setDashboardData((current) => ({
          ...current,
          productAnalytics: current.productAnalytics.map((product) =>
            product.id === result.product?.id ? { ...product, ...result.product } : product
          )
        }));
      });

      setStatusMessage("Produto atualizado com sucesso.");
      setEditingProduct(null);
    } catch {
      setErrorMessage("Falha ao atualizar o produto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin";
    }
  };

  return (
    <div className={`admin-theme admin-theme-${theme}`}>
      <main className="admin-shell">
        <section className="admin-hero">
          <div className="admin-hero-copy">
            <p className="admin-eyebrow">Painel LouisDeals</p>
            <h1 className="admin-display-title">
              Operacao, cadastros e performance em uma unica visao.
            </h1>
            <p className="admin-copy max-w-[58ch]">
              Altere produtos, monitore a perfomance de cada um e cadastre novos produtos.
            </p>
          </div>

          <div className="admin-hero-side">
            <div className="admin-hero-meta">
              <span className="admin-muted-label">Administrador</span>
              <strong className="admin-hero-name">{adminDisplayName}</strong>
              <p className="admin-copy mt-3">
                {topButton
                  ? `Botao lider: ${topButton.button_label} com ${formatCount(topButton.total_clicks)} cliques.`
                  : "Ainda nao existem cliques suficientes para destacar um botao."}
              </p>
            </div>

            <div className="admin-hero-actions">
              <button type="button" className="admin-primary-button" onClick={openCreateModal}>
                <CirclePlus className="h-4 w-4" />
                Adicionar produto
              </button>

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              >
                {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
                {theme === "dark" ? "Tema claro" : "Tema escuro"}
              </button>

              <button
                type="button"
                className="admin-secondary-button"
                onClick={() => window.location.reload()}
              >
                <RefreshCcw className="h-4 w-4" />
                Atualizar dados
              </button>

              <button
                type="button"
                className="admin-danger-button"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "Saindo..." : "Sair"}
              </button>
            </div>
          </div>
        </section>

        {statusMessage ? (
          <div className="admin-alert admin-alert-success admin-page-alert">{statusMessage}</div>
        ) : null}

        <section className="admin-metrics-grid">
          <article className="admin-stat-card">
            <span className="admin-stat-icon">
              <Box className="h-5 w-5" />
            </span>
            <p className="admin-stat-label">Produtos cadastrados</p>
            <strong className="admin-stat-value">{formatCount(dashboardData.totals.totalProducts)}</strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-icon">
              <BarChart3 className="h-5 w-5" />
            </span>
            <p className="admin-stat-label">Cliques em oferta</p>
            <strong className="admin-stat-value">
              {formatCount(dashboardData.totals.totalProductClicks)}
            </strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-icon">
              <Activity className="h-5 w-5" />
            </span>
            <p className="admin-stat-label">Botoes rastreados</p>
            <strong className="admin-stat-value">
              {formatCount(dashboardData.totals.totalTrackedButtons)}
            </strong>
          </article>

          <article className="admin-stat-card">
            <span className="admin-stat-icon">
              <RefreshCcw className="h-5 w-5" />
            </span>
            <p className="admin-stat-label">Ultima atividade</p>
            <strong className="admin-stat-value admin-stat-date">
              {formatDate(dashboardData.totals.lastActivityAt)}
            </strong>
          </article>
        </section>

        <section className="admin-content-grid">
          <section className="admin-panel">
            <div className="admin-section-head">
              <div>
                <p className="admin-eyebrow">Performance por produto</p>
                <h2 className="admin-title mt-3">
                  Veja os mais clicados, os menos clicados e os mais recentes.
                </h2>
              </div>
            </div>

            <div className="admin-toolbar">
              <div className="admin-search-wrap">
                <Search className="h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar por nome, categoria ou ID do achado"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              <div className="admin-filter-row">
                <button
                  type="button"
                  className={`admin-chip ${sortMode === "most-clicked" ? "admin-chip-active" : ""}`}
                  onClick={() => setSortMode("most-clicked")}
                >
                  Mais clicados
                </button>
                <button
                  type="button"
                  className={`admin-chip ${sortMode === "least-clicked" ? "admin-chip-active" : ""}`}
                  onClick={() => setSortMode("least-clicked")}
                >
                  Menos clicados
                </button>
                <button
                  type="button"
                  className={`admin-chip ${sortMode === "latest" ? "admin-chip-active" : ""}`}
                  onClick={() => setSortMode("latest")}
                >
                  Mais recentes
                </button>
              </div>
            </div>

            <div className="admin-product-list">
              {filteredProducts.length === 0 ? (
                <div className="admin-empty-state">Nenhum produto encontrado para esse filtro.</div>
              ) : (
                filteredProducts.map((product) => {
                  const ratio = maxClicks > 0 ? Math.max(product.total_clicks / maxClicks, 0.08) : 0.08;

                  return (
                    <article key={product.id} className="admin-product-card">
                      <div className="admin-product-media">
                        <Image
                          src={product.url_imagem}
                          alt={product.titulo}
                          fill
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 132px, 180px"
                          className="object-cover"
                        />
                      </div>

                      <div className="admin-product-body">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <span className="admin-muted-label">Achado #{product.numero_achado}</span>
                            <h3 className="admin-product-title">{product.titulo}</h3>
                            <p className="admin-copy mt-2">
                              Categoria {product.categoria} | {product.preco?.trim() || "Sob consulta"}
                            </p>
                          </div>

                          <div className="admin-product-actions">
                            <button
                              type="button"
                              className="admin-secondary-button admin-inline-button"
                              onClick={() => openEditModal(product)}
                            >
                              <PencilLine className="h-4 w-4" />
                              Editar
                            </button>

                            <a
                              href={product.link_afiliado}
                              target="_blank"
                              rel="noreferrer"
                              className="admin-inline-link"
                            >
                              Abrir oferta
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          </div>
                        </div>

                        <div className="admin-progress-track">
                          <span className="admin-progress-fill" style={{ width: `${ratio * 100}%` }} />
                        </div>

                        <div className="admin-product-stats">
                          <span>Cliques: {formatCount(product.total_clicks)}</span>
                          <span>Ultimo clique: {formatDate(product.last_clicked_at)}</span>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>

          <div className="admin-side-stack">
            <section className="admin-panel">
              <div className="admin-section-head">
                <div>
                  <p className="admin-eyebrow">Botoes do site</p>
                  <h2 className="admin-title mt-3">Ranking agregado de todos os botoes rastreados.</h2>
                </div>
              </div>

              <div className="admin-button-grid">
                {dashboardData.buttonAnalytics.length === 0 ? (
                  <div className="admin-empty-state">Ainda nao existem botoes com cliques registrados.</div>
                ) : (
                  dashboardData.buttonAnalytics.map((button) => (
                    <article key={button.button_key} className="admin-button-card">
                      <p className="admin-muted-label">{button.button_label}</p>
                      <strong className="admin-button-value">{formatCount(button.total_clicks)} cliques</strong>
                      <span className="admin-button-meta">Chave: {button.button_key}</span>
                      <span className="admin-button-meta">Pagina: {button.sample_path || "/"}</span>
                      <span className="admin-button-meta">
                        Ultimo clique: {formatDate(button.last_clicked_at)}
                      </span>
                    </article>
                  ))
                )}
              </div>
            </section>

            <section className="admin-panel">
              <div className="admin-section-head">
                <div>
                  <p className="admin-eyebrow">Atividade recente</p>
                  <h2 className="admin-title mt-3">Ultimos cliques registrados pelo site.</h2>
                </div>
              </div>

              <div className="admin-activity-list">
                {dashboardData.recentClicks.length === 0 ? (
                  <div className="admin-empty-state">Ainda nao existem cliques registrados.</div>
                ) : (
                  dashboardData.recentClicks.map((item) => (
                    <article key={item.id} className="admin-activity-item">
                      <div>
                        <p className="admin-activity-title">{item.button_label}</p>
                        <p className="admin-copy">
                          {item.page_path || "/"} {item.product_id ? `| Produto #${item.product_id}` : ""}
                        </p>
                      </div>
                      <span className="admin-activity-time">{formatDate(item.clicked_at)}</span>
                    </article>
                  ))
                )}
              </div>
            </section>
          </div>
        </section>

        {(isCreateModalOpen || editingProduct) && (
          <div
            className="admin-modal-backdrop"
            onClick={isCreateModalOpen ? closeCreateModal : closeEditModal}
          >
            <aside
              role="dialog"
              aria-modal="true"
              aria-label={editingProduct ? "Editar produto" : "Cadastrar novo produto"}
              className="admin-modal-panel admin-panel"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="admin-modal-header">
                <div>
                  <p className="admin-eyebrow">
                    {editingProduct ? "Editar produto" : "Cadastrar produto"}
                  </p>
                  <h2 className="admin-title mt-3">
                    {editingProduct
                      ? `Atualize os dados do achado #${editingProduct.numero_achado}.`
                      : "Adicione um novo achado com imagem, categoria e link final."}
                  </h2>
                </div>

                <button
                  type="button"
                  className="admin-secondary-button admin-close-button"
                  onClick={editingProduct ? closeEditModal : closeCreateModal}
                  aria-label="Fechar modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form className="space-y-4" onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}>
                {editingProduct ? <input type="hidden" name="productId" value={editingProduct.id} /> : null}
                {editingProduct ? (
                  <input type="hidden" name="currentImageUrl" value={editingProduct.url_imagem} />
                ) : null}

                <div className="admin-form-grid">
                  <label className="admin-field">
                    <span>ID do achado</span>
                    <input
                      type="number"
                      name="numeroAchado"
                      placeholder="Ex: 513"
                      min="1"
                      defaultValue={editingProduct?.numero_achado}
                      required
                    />
                  </label>

                  <label className="admin-field">
                    <span>Categoria</span>
                    <input
                      type="text"
                      name="categoria"
                      placeholder="Casa, Beleza, Tech..."
                      defaultValue={editingProduct?.categoria}
                      required
                    />
                  </label>
                </div>

                <label className="admin-field">
                  <span>Nome do produto</span>
                  <input
                    type="text"
                    name="titulo"
                    placeholder="Nome visivel na vitrine"
                    defaultValue={editingProduct?.titulo}
                    required
                  />
                </label>

                <div className="admin-form-grid">
                  <label className="admin-field">
                    <span>Preco</span>
                    <input
                      type="text"
                      name="preco"
                      placeholder={editingProduct ? "Deixe vazio para Sob consulta" : "Ex: R$ 39,90"}
                      defaultValue={editingProduct?.preco ?? ""}
                    />
                  </label>

                  <label className="admin-field">
                    <span>Link de afiliado</span>
                    <input
                      type="url"
                      name="linkAfiliado"
                      placeholder="https://..."
                      defaultValue={editingProduct?.link_afiliado}
                      required
                    />
                  </label>
                </div>

                <div className="admin-image-mode-row">
                  <button
                    type="button"
                    className={`admin-chip ${imageMode === "url" ? "admin-chip-active" : ""}`}
                    onClick={() => setImageMode("url")}
                  >
                    URL da imagem
                  </button>
                  <button
                    type="button"
                    className={`admin-chip ${imageMode === "upload" ? "admin-chip-active" : ""}`}
                    onClick={() => setImageMode("upload")}
                  >
                    Upload de arquivo
                  </button>
                </div>

                {imageMode === "url" ? (
                  <label className="admin-field">
                    <span>URL da imagem</span>
                    <input
                      type="url"
                      name="imageUrl"
                      placeholder="https://..."
                      defaultValue={editingProduct?.url_imagem}
                      required={!editingProduct}
                    />
                  </label>
                ) : (
                  <label className="admin-upload-field">
                    <span className="admin-upload-label">
                      <ImagePlus className="h-4 w-4" />
                      Enviar JPG, PNG, WEBP ou GIF
                    </span>
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="imageFile"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      required={!editingProduct}
                    />
                  </label>
                )}

                {statusMessage ? <div className="admin-alert admin-alert-success">{statusMessage}</div> : null}
                {errorMessage ? <div className="admin-alert admin-alert-error">{errorMessage}</div> : null}

                <button type="submit" className="admin-primary-button w-full" disabled={isSubmitting}>
                  {editingProduct ? <PencilLine className="h-4 w-4" /> : <CirclePlus className="h-4 w-4" />}
                  {isSubmitting
                    ? "Salvando..."
                    : editingProduct
                      ? "Salvar alteracoes"
                      : "Cadastrar produto"}
                </button>
              </form>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
