<template>
    <div class="container">
        <div style="text-align:center; margin-bottom: 2.5rem;">
            <h1 style="font-size:2rem; font-weight:700; margin-bottom:0.5rem;">Generador de CV</h1>
            <p style="color:#666;">Elegí una plantilla para empezar</p>
        </div>

        <div class="templates-grid">
            <div v-for="t in templates" :key="t.id" class="template-card"
                :class="{ selected: plantillaSeleccionada === t.id }" @click="plantillaSeleccionada = t.id">
                <div class="template-preview" :style="{ borderTop: `4px solid ${t.color}` }">
                    <component :is="t.preview" demo />
                </div>
                <div class="template-info">
                    <div style="display:flex; align-items:center; justify-content:space-between;">
                        <span class="template-name">{{ t.nombre }}</span>
                        <span v-if="plantillaSeleccionada === t.id" class="badge-selected">✓ Elegida</span>
                    </div>
                    <span class="template-desc">{{ t.descripcion }}</span>
                </div>
            </div>
        </div>

        <div style="text-align:center; margin-top:2rem;">
            <button class="btn btn-primary" :disabled="!plantillaSeleccionada"
                style="font-size:1rem; padding: 0.8rem 2rem;" @click="siguiente">
                Continuar →
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import TemplateClasica from '~/components/templates/clasica.vue'
import TemplateModerna from '~/components/templates/modern.vue'
import TemplateMinimalista from '~/components/templates/minimalist.vue'
import TemplateAts from '~/components/templates/ats.vue'

const { plantillaSeleccionada } = useCvData()
const router = useRouter()

const templates = [
    {
        id: 'clasica' as const,
        nombre: 'Clásica',
        descripcion: 'Formal y estructurada. Ideal para perfiles tradicionales.',
        color: '#2C3E50',
        preview: TemplateClasica
    },
    {
        id: 'moderna' as const,
        nombre: 'Moderna',
        descripcion: 'Sidebar colorido. Perfecta para roles creativos y tech.',
        color: '#6C63FF',
        preview: TemplateModerna
    },
    {
        id: 'minimalista' as const,
        nombre: 'Minimalista',
        descripcion: 'Limpia y elegante. Deja que el contenido hable.',
        color: '#111',
        preview: TemplateMinimalista
    },
    {
        id: 'ats' as const,
        nombre: 'ATS',
        descripcion: 'Optimizada para sistemas de selección automatizados.',
        color: '#1a1a1a',
        preview: TemplateAts
    }
]

const siguiente = () => {
    if (plantillaSeleccionada.value) router.push('/formulario')
}
</script>

<style scoped>
.templates-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
}

.template-card {
    background: white;
    border-radius: 12px;
    border: 2px solid #e8e8e8;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s;
}

.template-card:hover {
    border-color: #bbb;
    transform: translateY(-2px);
}

.template-card.selected {
    border-color: #6C63FF;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.15);
}

.template-preview {
    height: 280px;
    overflow: hidden;
    transform-origin: top left;
    position: relative;
}

.template-preview>* {
    transform: scale(0.45);
    transform-origin: top left;
    width: 222%;
    pointer-events: none;
}

.template-info {
    padding: 0.85rem 1rem;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.template-name {
    font-weight: 600;
    font-size: 0.95rem;
}

.template-desc {
    font-size: 0.8rem;
    color: #777;
}

.badge-selected {
    font-size: 0.75rem;
    background: #ede9ff;
    color: #6C63FF;
    padding: 2px 8px;
    border-radius: 20px;
    font-weight: 500;
}

@media (max-width: 640px) {
    .templates-grid {
        grid-template-columns: 1fr;
    }
}
</style>
