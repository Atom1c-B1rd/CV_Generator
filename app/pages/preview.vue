<template>
  <div class="container">
    <div class="topbar">
      <NuxtLink to="/formulario" class="back-link">← Editar datos</NuxtLink>
      <h1 class="topbar-title">Vista previa</h1>
      <div style="display:flex; gap:0.75rem;">
        <NuxtLink to="/"><button class="btn btn-outline">Cambiar plantilla</button></NuxtLink>
        <button class="btn btn-primary" :disabled="descargando" @click="descargarPDF">
          <span v-if="descargando">Generando...</span>
          <span v-else>⬇ Descargar PDF</span>
        </button>
      </div>
    </div>

    <div class="preview-wrapper">
      <div ref="cvRef" class="cv-page">
        <component :is="templateActual" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TemplateClasica from '~/components/templates/clasica.vue'
import TemplateModerna from '~/components/templates/modern.vue'
import TemplateMinimalista from '~/components/templates/minimalist.vue'
import TemplateAts from '~/components/templates/ats.vue'

const { cvData, plantillaSeleccionada } = useCvData()

const cvRef = ref<HTMLElement | null>(null)
const descargando = ref(false)

const templateActual = computed(() => {
  const map: Record<string, any> = {
    clasica: TemplateClasica,
    moderna: TemplateModerna,
    minimalista: TemplateMinimalista,
    ats: TemplateAts,
  }
  return map[plantillaSeleccionada.value || 'clasica']
})

const descargarPDF = async () => {
  if (!cvRef.value) return
  descargando.value = true

  try {
    const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ])

    const A4_WIDTH_PX = 794
    const A4_HEIGHT_PX = 1123

    const canvas = await html2canvas(cvRef.value, {
      scale: 2,
      useCORS: true,
      width: A4_WIDTH_PX,
      windowWidth: A4_WIDTH_PX,
    })

    const imgData = canvas.toDataURL('image/jpeg', 0.97)
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

    const pdfW = pdf.internal.pageSize.getWidth()
    const pdfH = pdf.internal.pageSize.getHeight()

    // Si el CV es más alto que una página, lo divide
    const canvasHeightMm = (canvas.height / canvas.width) * pdfW
    if (canvasHeightMm <= pdfH) {
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, canvasHeightMm)
    } else {
      // Multi-página
      let yOffset = 0
      const sliceHeightPx = Math.floor((pdfH / pdfW) * canvas.width)

      while (yOffset < canvas.height) {
        const pageCanvas = document.createElement('canvas')
        pageCanvas.width = canvas.width
        pageCanvas.height = Math.min(sliceHeightPx, canvas.height - yOffset)
        const ctx = pageCanvas.getContext('2d')!
        ctx.drawImage(canvas, 0, yOffset, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height)
        const pageImg = pageCanvas.toDataURL('image/jpeg', 0.97)
        const pageHeightMm = (pageCanvas.height / canvas.width) * pdfW
        if (yOffset > 0) pdf.addPage()
        pdf.addImage(pageImg, 'JPEG', 0, 0, pdfW, pageHeightMm)
        yOffset += sliceHeightPx
      }
    }

    const nombre = cvData.nombre.replace(/\s+/g, '_') || 'mi_cv'
    pdf.save(`CV_${nombre}.pdf`)
  } finally {
    descargando.value = false
  }
}
</script>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  gap: 1rem;
}
.back-link { color: #666; text-decoration: none; font-size: 0.9rem; white-space: nowrap; }
.topbar-title { font-size: 1.3rem; font-weight: 600; }

.preview-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.cv-page {
  width: 794px;
  min-height: 1123px;
  background: white;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  border-radius: 4px;
  overflow: hidden;
}
</style>