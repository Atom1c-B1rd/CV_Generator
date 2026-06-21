<template>
  <div class="cv-ats">
    <!-- Nombre y rol -->
    <div class="ats-header">
      <div class="ats-name">{{ data.nombre || 'Tu Nombre' }}</div>
      <div class="ats-role">{{ data.rol || 'Tu Profesión' }}</div>
      <div class="ats-contact">
        <span v-if="data.email">{{ data.email }}</span>
        <span v-if="data.telefono">{{ data.telefono }}</span>
        <span v-if="data.ubicacion">{{ data.ubicacion }}</span>
        <span v-if="data.linkedin">{{ data.linkedin }}</span>
      </div>
    </div>

    <!-- Sobre mí -->
    <div v-if="data.sobre_mi" class="ats-section">
      <div class="ats-section-title">RESUMEN PROFESIONAL</div>
      <p class="ats-body">{{ data.sobre_mi }}</p>
    </div>

    <!-- Experiencia -->
    <div v-if="data.experiencia.filter(e => e.puesto).length" class="ats-section">
      <div class="ats-section-title">EXPERIENCIA LABORAL</div>
      <div v-for="exp in data.experiencia.filter(e => e.puesto)" :key="exp.puesto" class="ats-entry">
        <div class="ats-entry-header">
          <span class="ats-entry-title">{{ exp.puesto }}</span>
          <span class="ats-entry-date" v-if="exp.desde">{{ exp.desde }} – {{ exp.hasta || 'Presente' }}</span>
        </div>
        <div class="ats-entry-sub" v-if="exp.empresa">{{ exp.empresa }}</div>
        <p class="ats-body" v-if="exp.descripcion">{{ exp.descripcion }}</p>
      </div>
    </div>

    <!-- Educación -->
    <div v-if="data.educacion.filter(e => e.titulo).length" class="ats-section">
      <div class="ats-section-title">EDUCACIÓN</div>
      <div v-for="edu in data.educacion.filter(e => e.titulo)" :key="edu.titulo" class="ats-entry">
        <div class="ats-entry-header">
          <span class="ats-entry-title">{{ edu.titulo }}</span>
          <span class="ats-entry-date" v-if="edu.anio">{{ edu.anio }}</span>
        </div>
        <div class="ats-entry-sub" v-if="edu.institucion">{{ edu.institucion }}</div>
      </div>
    </div>

    <!-- Skills -->
    <div v-if="data.skills.filter(s => s).length" class="ats-section">
      <div class="ats-section-title">HABILIDADES</div>
      <p class="ats-body">{{ data.skills.filter(s => s).join(' · ') }}</p>
    </div>

    <!-- Idiomas -->
    <div v-if="data.idiomas.filter(i => i.idioma).length" class="ats-section">
      <div class="ats-section-title">IDIOMAS</div>
      <p class="ats-body">
        {{ data.idiomas.filter(i => i.idioma).map(i => `${i.idioma} (${i.nivel})`).join(' · ') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{ demo?: boolean }>()
const { cvData } = useCvData()

const demoData: CvData = {
  nombre: 'Ana García López', rol: 'Diseñadora UX/UI Senior',
  email: 'ana@email.com', telefono: '+54 11 1234-5678',
  ubicacion: 'Buenos Aires, AR', linkedin: 'linkedin.com/in/ana',
  sobre_mi: 'Diseñadora UX/UI con más de 5 años de experiencia desarrollando productos digitales centrados en el usuario para empresas tecnológicas de escala regional.',
  experiencia: [
    { empresa: 'Mercado Libre', puesto: 'UX Designer Senior', desde: '2021', hasta: 'Presente', descripcion: 'Lideré el rediseño del flujo de compra mobile, reduciendo la tasa de abandono en un 18%. Coordiné un equipo de 4 diseñadores junior.' },
    { empresa: 'Globant', puesto: 'UX Designer', desde: '2019', hasta: '2021', descripcion: 'Diseño de interfaces para clientes internacionales como Disney y Google. Trabajo en equipos ágiles con sprints semanales.' }
  ],
  educacion: [{ institucion: 'Universidad de Buenos Aires', titulo: 'Licenciatura en Diseño Gráfico', anio: '2018' }],
  skills: ['Figma', 'Adobe XD', 'HTML/CSS', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  idiomas: [{ idioma: 'Español', nivel: 'nativo' }, { idioma: 'Inglés', nivel: 'avanzado' }]
}

const data = computed(() => props.demo ? demoData : cvData)
</script>

<style scoped>
.cv-ats {
  font-family: 'Arial', 'Helvetica Neue', sans-serif;
  background: white;
  padding: 36px 44px;
  color: #000;
  min-height: 100%;
}

/* Header */
.ats-header {
  text-align: center;
  border-bottom: 2px solid #000;
  padding-bottom: 12px;
  margin-bottom: 4px;
}
.ats-name {
  font-size: 22px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.ats-role {
  font-size: 12px;
  color: #333;
  margin-top: 3px;
  font-weight: 500;
}
.ats-contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 7px;
  font-size: 10px;
  color: #333;
}

/* Sections */
.ats-section {
  margin-top: 16px;
}
.ats-section-title {
  font-size: 10px;
  font-weight: 700;
  color: #000;
  letter-spacing: 1px;
  border-bottom: 1px solid #000;
  padding-bottom: 3px;
  margin-bottom: 8px;
}

/* Entries */
.ats-entry {
  margin-bottom: 10px;
}
.ats-entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.ats-entry-title {
  font-size: 12px;
  font-weight: 700;
  color: #000;
}
.ats-entry-date {
  font-size: 10px;
  color: #444;
  white-space: nowrap;
  margin-left: 8px;
}
.ats-entry-sub {
  font-size: 11px;
  color: #333;
  font-style: italic;
  margin-top: 1px;
}
.ats-body {
  font-size: 11px;
  color: #222;
  line-height: 1.65;
  margin-top: 4px;
}
</style>