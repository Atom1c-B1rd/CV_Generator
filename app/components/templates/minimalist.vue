<template>
  <div class="cv-minimal">
    <div class="top">
      <div class="name">{{ data.nombre || 'Tu Nombre' }}</div>
      <div class="role">{{ data.rol || 'Tu Profesión' }}</div>
      <div class="contact">
        <span v-if="data.email">{{ data.email }}</span>
        <span v-if="data.telefono">{{ data.telefono }}</span>
        <span v-if="data.ubicacion">{{ data.ubicacion }}</span>
        <span v-if="data.linkedin">{{ data.linkedin }}</span>
      </div>
    </div>

    <div v-if="data.sobre_mi" class="section">
      <div class="s-label">Sobre mí</div>
      <div class="s-content">
        <p class="body-text">{{ data.sobre_mi }}</p>
      </div>
    </div>

    <div v-if="data.experiencia.filter(e => e.puesto).length" class="section">
      <div class="s-label">Experiencia</div>
      <div class="s-content">
        <div v-for="exp in data.experiencia.filter(e => e.puesto)" :key="exp.puesto" class="item">
          <div class="item-title">{{ exp.puesto }}<span class="item-company" v-if="exp.empresa"> — {{ exp.empresa }}</span></div>
          <div class="item-meta" v-if="exp.desde">{{ exp.desde }} – {{ exp.hasta || 'presente' }}</div>
          <p class="body-text">{{ exp.descripcion }}</p>
        </div>
      </div>
    </div>

    <div v-if="data.educacion.filter(e => e.titulo).length" class="section">
      <div class="s-label">Educación</div>
      <div class="s-content">
        <div v-for="edu in data.educacion.filter(e => e.titulo)" :key="edu.titulo" class="item">
          <div class="item-title">{{ edu.titulo }}<span class="item-company" v-if="edu.institucion"> — {{ edu.institucion }}</span></div>
          <div class="item-meta" v-if="edu.anio">{{ edu.anio }}</div>
        </div>
      </div>
    </div>

    <div v-if="data.skills.filter(s => s).length" class="section">
      <div class="s-label">Skills</div>
      <div class="s-content">
        <div class="skill-row">
          <span v-for="skill in data.skills.filter(s => s)" :key="skill" class="skill-pill">{{ skill }}</span>
        </div>
      </div>
    </div>

    <div v-if="data.idiomas.filter(i => i.idioma).length" class="section">
      <div class="s-label">Idiomas</div>
      <div class="s-content">
        <div class="skill-row">
          <span v-for="idioma in data.idiomas.filter(i => i.idioma)" :key="idioma.idioma" class="skill-pill">
            {{ idioma.idioma }} · {{ idioma.nivel }}
          </span>
        </div>
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
  skills: ['Figma', 'Adobe XD', 'HTML/CSS', 'User Research', 'Prototyping'],
  idiomas: [{ idioma: 'Español', nivel: 'nativo' }, { idioma: 'Inglés', nivel: 'avanzado' }]
}

const data = computed(() => props.demo ? demoData : cvData)
</script>

<style scoped>
.cv-minimal { padding: 32px 36px; font-family: system-ui, sans-serif; background: white; min-height: 100%; }

.top { border-bottom: 2px solid #111; padding-bottom: 16px; margin-bottom: 4px; }
.name { font-size: 28px; font-weight: 700; color: #111; letter-spacing: -0.5px; }
.role { font-size: 13px; color: #888; margin-top: 3px; }
.contact { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 8px; }
.contact span { font-size: 11px; color: #aaa; }

.section { display: grid; grid-template-columns: 22% 78%; gap: 12px; margin-top: 16px; }
.s-label { font-size: 10px; font-weight: 700; color: #bbb; text-transform: uppercase; letter-spacing: 0.8px; padding-top: 2px; }
.s-content { border-top: 1px solid #eee; padding-top: 6px; }

.item { margin-bottom: 12px; }
.item:last-child { margin-bottom: 0; }
.item-title { font-size: 13px; font-weight: 600; color: #111; }
.item-company { font-weight: 400; color: #777; }
.item-meta { font-size: 11px; color: #bbb; margin: 2px 0; }
.body-text { font-size: 11px; color: #666; line-height: 1.6; }

.skill-row { display: flex; flex-wrap: wrap; gap: 5px; }
.skill-pill {
  font-size: 11px; color: #555;
  border: 1px solid #ddd;
  padding: 2px 10px;
  border-radius: 20px;
}
</style>
