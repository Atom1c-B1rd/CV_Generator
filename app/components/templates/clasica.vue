<template>
    <div class="cv-clasica">
        <div class="header">
            <div class="header-name">{{ data.nombre || 'Tu Nombre' }}</div>
            <div class="header-role">{{ data.rol || 'Tu Profesión' }}</div>
            <div class="header-contact">
                <span v-if="data.email">{{ data.email }}</span>
                <span v-if="data.telefono">· {{ data.telefono }}</span>
                <span v-if="data.ubicacion">· {{ data.ubicacion }}</span>
                <span v-if="data.linkedin">· {{ data.linkedin }}</span>
            </div>
        </div>

        <div class="body">
            <!-- Sidebar -->
            <div class="sidebar">
                <template v-if="data.skills.filter(s => s).length">
                    <div class="section-title">Habilidades</div>
                    <div v-for="skill in data.skills.filter(s => s)" :key="skill" class="skill-tag">{{ skill }}</div>
                </template>

                <template v-if="data.idiomas.filter(i => i.idioma).length">
                    <div class="section-title">Idiomas</div>
                    <div v-for="idioma in data.idiomas.filter(i => i.idioma)" :key="idioma.idioma" class="idioma-item">
                        <span>{{ idioma.idioma }}</span>
                        <span class="nivel">{{ idioma.nivel }}</span>
                    </div>
                </template>

                <template v-if="data.educacion.filter(e => e.titulo).length">
                    <div class="section-title">Educación</div>
                    <div v-for="edu in data.educacion.filter(e => e.titulo)" :key="edu.titulo" class="edu-item">
                        <div class="edu-titulo">{{ edu.titulo }}</div>
                        <div class="edu-meta">{{ edu.institucion }}<span v-if="edu.anio"> · {{ edu.anio }}</span></div>
                    </div>
                </template>
            </div>

            <!-- Main -->
            <div class="main">
                <template v-if="data.sobre_mi">
                    <div class="section-title">Sobre mí</div>
                    <p class="sobre-mi-text">{{ data.sobre_mi }}</p>
                </template>

                <template v-if="data.experiencia.filter(e => e.puesto).length">
                    <div class="section-title">Experiencia</div>
                    <div v-for="exp in data.experiencia.filter(e => e.puesto)" :key="exp.puesto + exp.empresa"
                        class="job-item">
                        <div class="job-title">{{ exp.puesto }}</div>
                        <div class="job-meta">{{ exp.empresa }}<span v-if="exp.desde"> · {{ exp.desde }}–{{ exp.hasta ||
                                'presente' }}</span></div>
                        <p class="job-desc">{{ exp.descripcion }}</p>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ demo?: boolean }>()
const { cvData } = useCvData()

const demoData: CvData = {
    nombre: 'Ana García López', rol: 'Diseñadora UX/UI',
    email: 'ana@email.com', telefono: '+54 11 1234-5678',
    ubicacion: 'Buenos Aires, AR', linkedin: 'linkedin.com/in/ana',
    sobre_mi: 'Diseñadora con 5 años de experiencia creando productos digitales centrados en el usuario.',
    experiencia: [
        { empresa: 'Mercado Libre', puesto: 'UX Designer Senior', desde: '2021', hasta: 'presente', descripcion: 'Lideré el rediseño del flujo de compra mobile, reduciendo la tasa de abandono en un 18%.' },
        { empresa: 'Globant', puesto: 'UX Designer', desde: '2019', hasta: '2021', descripcion: 'Diseño de interfaces para Disney y Google en equipos ágiles.' }
    ],
    educacion: [{ institucion: 'UBA', titulo: 'Lic. Diseño Gráfico', anio: '2018' }],
    skills: ['Figma', 'Adobe XD', 'HTML/CSS', 'User Research'],
    idiomas: [{ idioma: 'Español', nivel: 'nativo' }, { idioma: 'Inglés', nivel: 'avanzado' }]
}

const data = computed(() => props.demo ? demoData : cvData)
</script>

<style scoped>
.cv-clasica {
    font-family: 'Georgia', serif;
    background: white;
    min-height: 100%;
}

.header {
    background: #2C3E50;
    color: white;
    padding: 24px 28px;
}

.header-name {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.header-role {
    font-size: 13px;
    color: #aab7c4;
    margin-top: 3px;
}

.header-contact {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
    font-size: 11px;
    color: #aab7c4;
    font-family: system-ui, sans-serif;
}

.body {
    display: grid;
    grid-template-columns: 38% 62%;
    min-height: calc(100% - 80px);
}

.sidebar {
    background: #f8f9fa;
    border-right: 1px solid #e8e8e8;
    padding: 20px 16px;
    font-family: system-ui, sans-serif;
}

.main {
    padding: 20px 22px;
    font-family: system-ui, sans-serif;
}

.section-title {
    font-size: 10px;
    font-weight: 700;
    color: #2C3E50;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    border-bottom: 1.5px solid #2C3E50;
    padding-bottom: 4px;
    margin: 16px 0 8px;
}

.section-title:first-child {
    margin-top: 0;
}

.skill-tag {
    display: inline-block;
    background: #e8ecef;
    color: #444;
    font-size: 10px;
    border-radius: 3px;
    padding: 2px 7px;
    margin: 2px 2px 0 0;
}

.idioma-item {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #444;
    margin-bottom: 4px;
}

.nivel {
    color: #888;
}

.edu-item {
    margin-bottom: 8px;
}

.edu-titulo {
    font-size: 11px;
    font-weight: 600;
    color: #333;
}

.edu-meta {
    font-size: 10px;
    color: #888;
    margin-top: 1px;
}

.sobre-mi-text {
    font-size: 11px;
    color: #444;
    line-height: 1.6;
    margin-bottom: 4px;
}

.job-item {
    margin-bottom: 14px;
}

.job-title {
    font-size: 13px;
    font-weight: 600;
    color: #222;
}

.job-meta {
    font-size: 11px;
    color: #888;
    margin: 2px 0;
}

.job-desc {
    font-size: 11px;
    color: #555;
    line-height: 1.55;
    margin-top: 3px;
}
</style>
