<template>
  <div class="container">
    <!-- Header -->
    <div style="display:flex; align-items:center; gap:1rem; margin-bottom:2rem;">
      <NuxtLink to="/" style="color:#666; text-decoration:none; font-size:0.9rem;">← Cambiar plantilla</NuxtLink>
      <div style="flex:1">
        <div class="steps-bar">
          <div
            v-for="(paso, i) in pasos"
            :key="i"
            class="step-item"
            :class="{ active: pasoActual === i, done: pasoActual > i }"
            @click="pasoActual > i ? pasoActual = i : null"
          >
            <div class="step-dot">{{ pasoActual > i ? '✓' : i + 1 }}</div>
            <span class="step-label">{{ paso.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="card" style="margin-bottom:1.5rem;">
      <h2 style="font-size:1.2rem; font-weight:600; margin-bottom:1.5rem;">{{ pasos[pasoActual]?.label }}</h2>

      <!-- PASO 0: Datos personales -->
      <div v-if="pasoActual === 0">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="field">
            <label>Nombre completo *</label>
            <input v-model="cvData.nombre" placeholder="Ana García López" />
          </div>
          <div class="field">
            <label>Rol / Profesión *</label>
            <input v-model="cvData.rol" placeholder="Desarrolladora Full Stack" />
          </div>
          <div class="field">
            <label>Email *</label>
            <input v-model="cvData.email" type="email" placeholder="ana@email.com" />
          </div>
          <div class="field">
            <label>Teléfono</label>
            <input v-model="cvData.telefono" placeholder="+54 11 1234-5678" />
          </div>
          <div class="field">
            <label>Ubicación</label>
            <input v-model="cvData.ubicacion" placeholder="Buenos Aires, Argentina" />
          </div>
          <div class="field">
            <label>LinkedIn</label>
            <input v-model="cvData.linkedin" placeholder="linkedin.com/in/ana" />
          </div>
        </div>
        <div class="field">
          <label>Sobre mí</label>
          <textarea v-model="cvData.sobre_mi" rows="3" placeholder="Breve descripción profesional..."></textarea>
        </div>
      </div>

      <!-- PASO 1: Experiencia -->
      <div v-if="pasoActual === 1">
        <div
          v-for="(exp, i) in cvData.experiencia"
          :key="i"
          style="border:1px solid #eee; border-radius:8px; padding:1rem; margin-bottom:1rem;"
        >
          <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
            <span style="font-weight:500; color:#555; font-size:0.9rem;">Trabajo {{ i + 1 }}</span>
            <button v-if="cvData.experiencia.length > 1" class="btn-remove" @click="removeExp(i)">✕ Eliminar</button>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
            <div class="field">
              <label>Empresa</label>
              <input v-model="exp.empresa" placeholder="Mercado Libre" />
            </div>
            <div class="field">
              <label>Puesto</label>
              <input v-model="exp.puesto" placeholder="UX Designer Senior" />
            </div>
            <div class="field">
              <label>Desde</label>
              <input v-model="exp.desde" placeholder="2021" />
            </div>
            <div class="field">
              <label>Hasta</label>
              <input v-model="exp.hasta" placeholder="Presente" />
            </div>
          </div>
          <div class="field">
            <label>Descripción</label>
            <textarea v-model="exp.descripcion" rows="2" placeholder="Qué hacías en este rol..."></textarea>
          </div>
        </div>
        <button class="btn btn-outline" style="width:100%;" @click="addExp">+ Agregar trabajo</button>
      </div>

      <!-- PASO 2: Educacion -->
      <div v-if="pasoActual === 2">
        <div
          v-for="(edu, i) in cvData.educacion"
          :key="i"
          style="border:1px solid #eee; border-radius:8px; padding:1rem; margin-bottom:1rem;"
        >
          <div style="display:flex; justify-content:space-between; margin-bottom:0.75rem;">
            <span style="font-weight:500; color:#555; font-size:0.9rem;">Educación {{ i + 1 }}</span>
            <button v-if="cvData.educacion.length > 1" class="btn-remove" @click="removeEdu(i)">✕ Eliminar</button>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 120px; gap:1rem;">
            <div class="field">
              <label>Institución</label>
              <input v-model="edu.institucion" placeholder="UBA" />
            </div>
            <div class="field">
              <label>Título</label>
              <input v-model="edu.titulo" placeholder="Lic. Diseño Gráfico" />
            </div>
            <div class="field">
              <label>Año</label>
              <input v-model="edu.anio" placeholder="2018" />
            </div>
          </div>
        </div>
        <button class="btn btn-outline" style="width:100%;" @click="addEdu">+ Agregar educación</button>
      </div>

      <!-- PASO 3: Skills e idiomas -->
      <div v-if="pasoActual === 3">
        <div style="margin-bottom:1.5rem;">
          <label style="font-size:1rem; font-weight:600; color:#333; margin-bottom:0.75rem; display:block;">Habilidades</label>
          <div v-for="(skill, i) in cvData.skills" :key="i" style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
            <input v-model="cvData.skills[i]" placeholder="Ej: Vue.js, Figma, Python..." />
            <button class="btn-remove" @click="removeSkill(i)">✕</button>
          </div>
          <button class="btn btn-outline" style="margin-top:0.5rem;" @click="cvData.skills.push('')">+ Agregar skill</button>
        </div>

        <div>
          <label style="font-size:1rem; font-weight:600; color:#333; margin-bottom:0.75rem; display:block;">Idiomas</label>
          <div
            v-for="(idioma, i) in cvData.idiomas"
            :key="i"
            style="display:grid; grid-template-columns:1fr 1fr auto; gap:0.75rem; margin-bottom:0.5rem; align-items:center;"
          >
            <input v-model="idioma.idioma" placeholder="Español" />
            <select v-model="idioma.nivel">
              <option>nativo</option>
              <option>avanzado</option>
              <option>intermedio</option>
              <option>básico</option>
            </select>
            <button class="btn-remove" @click="cvData.idiomas.splice(i, 1)">✕</button>
          </div>
          <button class="btn btn-outline" @click="cvData.idiomas.push({ idioma: '', nivel: 'intermedio' })">+ Agregar idioma</button>
        </div>
      </div>
    </div>

    <!-- Navegacion -->
    <div style="display:flex; justify-content:space-between;">
      <button v-if="pasoActual > 0" class="btn btn-outline" @click="pasoActual--">← Anterior</button>
      <div v-else></div>
      <button
        v-if="pasoActual < pasos.length - 1"
        class="btn btn-primary"
        :disabled="!pasoValido"
        @click="pasoActual++"
      >
        Siguiente →
      </button>
      <NuxtLink v-else to="/preview">
        <button class="btn btn-purple" :disabled="!pasoValido">Ver preview →</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { cvData } = useCvData()
const pasoActual = ref(0)

const pasos = [
  { label: 'Datos personales' },
  { label: 'Experiencia' },
  { label: 'Educación' },
  { label: 'Skills e idiomas' }
]

const pasoValido = computed(() => {
  if (pasoActual.value === 0) return cvData.nombre && cvData.email && cvData.rol
  return true
})

const addExp = () => cvData.experiencia.push({ empresa: '', puesto: '', desde: '', hasta: '', descripcion: '' })
const removeExp = (i: number) => cvData.experiencia.splice(i, 1)
const addEdu = () => cvData.educacion.push({ institucion: '', titulo: '', anio: '' })
const removeEdu = (i: number) => cvData.educacion.splice(i, 1)
const removeSkill = (i: number) => cvData.skills.splice(i, 1)
</script>

<style scoped>
.steps-bar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.step-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex: 1;
  cursor: default;
}
.step-item.done { cursor: pointer; }
.step-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e8e8e8;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  flex-shrink: 0;
  transition: all 0.2s;
}
.step-item.active .step-dot { background: #6C63FF; color: white; }
.step-item.done .step-dot { background: #2ecc71; color: white; }
.step-label {
  font-size: 0.8rem;
  color: #888;
  white-space: nowrap;
}
.step-item.active .step-label { color: #333; font-weight: 500; }

.btn-remove {
  background: none;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  color: #999;
  font-size: 0.8rem;
  white-space: nowrap;
}
.btn-remove:hover { background: #fff0f0; border-color: #ffcdd2; color: #e53935; }
</style>
