# Formulario de Smoothies

Componente de captura del único producto **POS Smoothies** para la estudiante de
chef. El POS vive en una PC y ella lo opera desde su iPad en la misma red local.
En la carpeta de familia, `smoothies/app` y `smoothies/intake` reúnen ambos
componentes. Este repositorio conserva la publicación web y los borradores del
formulario; no representa otro POS ni otra clienta.

Formulario estático para preparar menú, tamaños, extras, paleta e inventario
previsto. La clienta completa la información en su teléfono/iPad y comparte
`menu-smoothies.json` para revisión e importación en el POS.

- [Abrir el formulario](https://jorgecantu276.github.io/formulario-smoothies/).
- [Propósito, progreso, límites y siguientes pasos](docs/products/smoothies-intake.md).

## Guardado y entrega

El borrador se guarda en el mismo navegador/dispositivo/origen. No hay una cuenta
ni sincronización automática al cambiar de equipo. No borrar datos del sitio
antes de exportar una copia. Compartir/descargar el JSON es una acción explícita;
el formulario no manda información al dueño por sí solo. Cantidades previstas
no equivalen a conteos físicos del negocio.

## Cambios y publicación

Para comprobar cambios, usa Node 24 y ejecuta `npm ci` y `npm test`. Las pruebas
abren el formulario real con datos ficticios y comprueban nombres de caja,
duplicados de insumos/extras, recuperación y corrección de borradores. npm solo
aporta herramientas de prueba; la web sigue siendo un HTML estático sin backend.

`index.html` es la aplicación. Mantener el sitio simple: no añadir backend,
cuentas o dependencias sin una necesidad confirmada. Preservar URL pública,
guardado local y contrato de exportación/importación versión 1. Probar con datos
ficticios en otro origen para no reemplazar borradores de la clienta.

GitHub Pages publica desde `main`; un merge puede cambiar el sitio público.
Revisar el cambio y comprobar borrador/reapertura, móvil, extras, exportación e
importación antes de integrar. El POS y sus bases de datos se distribuyen aparte.
No subir JSON real de clientes, credenciales ni copias privadas a este repositorio.
