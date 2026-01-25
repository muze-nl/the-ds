import imports    from '../src/imports.json'   with { type: 'json' }
import layers     from '../src/layers.css'     with { type: 'css' }
import reset      from '../src/reset.css'      with { type: 'css' }
import colors     from '../src/colors.css'     with { type: 'css' }
import space      from '../src/space.css'      with { type: 'css' }
import fonts      from '../src/fonts.css'      with { type: 'css' }
import typography from '../src/typography.css' with { type: 'css' }
import icons      from '../src/icons.css'      with { type: 'css' }
import forms      from '../src/forms.css'      with { type: 'css' }
import buttons    from '../src/buttons.css'    with { type: 'css' }
import grid       from '../src/grid.css'       with { type: 'css' }
import glow       from '../src/glow.css'       with { type: 'css' }
import box        from '../src/box.css'        with { type: 'css' }
import dialog     from '../src/dialog.css'     with { type: 'css' }
import dropdown   from '../src/dropdown.css'   with { type: 'css' }
import tabs       from '../src/tabs.css'       with { type: 'css' }
import badge      from '../src/badge.css'      with { type: 'css' }
import navigation from '../src/navigation.css' with { type: 'css' }
import alert      from '../src/alert.css'      with { type: 'css' }
import toast      from '../src/toast.css'      with { type: 'css' }
import alignment  from '../src/alignment.css'  with { type: 'css' }
import shadow     from '../src/shadow.css'     with { type: 'css' }

export default {
  	css: {
        import: imports.join("\n"),
        layers,
        reset,
        fonts,
        colors,
        space,
        typography,
        icons,
        forms,
        buttons,
        grid,
        glow,
        box,
        dialog,
        dropdown,
        tabs,
        badge,
        navigation,
        alert,
        toast,
        alignment,
        shadow
  	},
    actions: {
        dsInit: async function() {
            this.actions.dsLoadSheet.call(this, 'theds', 
                await this.actions.dsBuildSheet.call(this))
        },
        dsBuildSheet: async function() {
            let styles = ''
            for (let sheet in this.css) {
                styles += "\n\n/* "+sheet+".css */\n"
                if (typeof this.css[sheet] == 'string') {
                    styles += this.css[sheet]
                } else if (this.css[sheet] && typeof this.css[sheet] == 'object') {
                    styles += Array.from(this.css[sheet].cssRules)
                        .map(r => r.cssText || '').join('\n')
                }
            }
            return styles
        },
        dsLoadSheet: async function(sheet, rules) {
            let style = document.head.querySelector(sheet+'.css')
            if (!style) {
                style = document.createElement('style')
                style.id = sheet+'.css'
                document.head.appendChild(style)
            }
            if (typeof rules == 'string') {
                style.innerHTML = rules
            } else {
                style.innerHTML = Array.from(rules.cssRules)
                  .map(r => r.cssText || '').join('\n')
            }
        }
    },
    hooks: {
        start: function() {
            this.actions.dsInit.call(this)
        }
    }
}
