<template>
  <div class="cv-moderna">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="avatar">{{ initials }}</div>
      <div class="name">{{ data.nombre || 'Tu Nombre' }}</div>
      <div class="role">{{ data.rol || 'Tu Profesión' }}</div>

      <hr class="divider" />

      <div class="s-section">
        <div class="s-title">Contacto</div>
        <div v-if="data.email" class="s-item">{{ data.email }}</div>
        <div v-if="data.telefono" class="s-item">{{ data.telefono }}</div>
        <div v-if="data.ubicacion" class="s-item">{{ data.ubicacion }}</div>
        <div v-if="data.linkedin" class="s-item">{{ data.linkedin }}</div>
      </div>

      <hr class="divider" />

      <template v-if="data.skills.filter(s => s).length">
        <div class="s-section">
          <div class="s-title">Habilidades</div>
          <div v-for="skill in data.skills.filter(s => s)" :key="skill" class="s-item">{{ skill }}</div>
        </div>
        <hr class="divider" />
      </template>

      <template v-if="data.idiomas.filter(i => i.idioma).length">
        <div class="s-section">
          <div class="s-title">Idiomas</div>
          <div v-for="idioma in data.idiomas.filter(i => i.idioma)" :key="idioma.idioma" class="s-item">
            {{ idioma.idioma }} — {{ idioma.nivel }}
          </div>
        </div>
      </template>
    </div>

    <!-- Main -->
    <div class="main">
      <template v-if="data.sobre_mi">
        <div class="m-title">Sobre mí</div>
        <p class="body-text">{{ data.sobre_mi }}</p>
      </template>

      <template v-if="data.experiencia.filter(e => e.puesto).length">
        <div class="m-title">Experiencia</div>
        <div v-for="exp in data.experiencia.filter(e => e.puesto)" :key="exp.puesto" class="job-item">
          <div class="job-title">{{ exp.puesto }}</div>
          <div class="job-company">{{ exp.empresa }}</div>
          <div class="job-date" v-if="exp.desde">{{ exp.desde }} – {{ exp.hasta || 'presente' }}</div>
          <p class="body-text" style="margin-top:4px">{{ exp.descripcion }}</p>
        </div>
      </template>

      <template v-if="data.educacion.filter(e => e.titulo).length">
        <div class="m-title">Educación</div>
        <div v-for="edu in data.educacion.filter(e => e.titulo)" :key="edu.titulo" class="job-item">
          <div class="job-title">{{ edu.titulo }}</div>
          <div class="job-company">{{ edu.institucion }}</div>
          <div class="job-date" v-if="edu.anio">{{ edu.anio }}</div>
        </div>
      </template>
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

const initials = computed(() => {
  const name = data.value.nombre || ''
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || 'CV'
})
</script>

<style scoped>
.cv-moderna { display: grid; grid-template-columns: 36% 64%; min-height: 100%; font-family: system-ui, sans-serif; background: white; }

.sidebar { background: #6C63FF; padding: 28px 18px; display: flex; flex-direction: column; gap: 12px; }
.avatar {
  width: 60px; height: 60px; border-radius: 50%;
  background: rgba(255,255,255,0.2); color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; font-weight: 700; margin: 0 auto;
}
.name { font-size: 16px; font-weight: 700; color: white; text-align: center; }
.role { font-size: 11px; color: rgba(255,255,255,0.7); text-align: center; }
.divider { border: none; border-top: 1px solid rgba(255,255,255,0.2); margin: 0; }
.s-section { display: flex; flex-direction: column; gap: 4px; }
.s-title { font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.7px; margin-bottom: 2px; }
.s-item { font-size: 11px; color: rgba(255,255,255,0.85); line-height: 1.5; }

.main { padding: 24px 22px; background: white; }
.m-title {
  font-size: 12px; font-weight: 700; color: #6C63FF;
  text-transform: uppercase; letter-spacing: 0.6px;
  border-left: 3px solid #6C63FF; padding-left: 8px;
  margin: 18px 0 10px;
}
.m-title:first-child { margin-top: 0; }

.job-item { margin-bottom: 14px; }
.job-title { font-size: 13px; font-weight: 600; color: #222; }
.job-company { font-size: 11px; color: #6C63FF; margin-top: 1px; }
.job-date { font-size: 11px; color: #aaa; }
.body-text { font-size: 11px; color: #555; line-height: 1.6; }
</style>
