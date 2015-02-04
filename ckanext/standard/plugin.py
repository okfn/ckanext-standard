import ckan.plugins as plugins
import ckan.plugins.toolkit as toolkit


class StandardPlugin(plugins.SingletonPlugin):
    '''Standard theme plugin.

    '''
    # Declare that this class implements various interfaces.
    plugins.implements(plugins.IConfigurer)
    plugins.implements(plugins.ITemplateHelpers)

    # IConfigurer
    def update_config(self, config):

        # Add this plugin's templates dir to CKAN's extra_template_paths, so
        # that CKAN will use this plugin's custom templates.
        # 'templates' is the path to the templates dir, relative to this
        # plugin.py file.
        toolkit.add_template_directory(config, 'theme/templates')

        # Add this plugin's public dir to CKAN's extra_public_paths, so
        # that CKAN will use this plugin's custom static files.
        toolkit.add_public_directory(config, 'theme/public')

        # Register this plugin's fanstatic directory with CKAN.
        # Here, 'fanstatic' is the path to the fanstatic directory
        # (relative to this plugin.py file), and 'example_theme' is the name
        # that we'll use to refer to this fanstatic directory from CKAN
        # templates.
        toolkit.add_resource('theme/resources', 'standard-theme')

    # ITemplateHelpers
    def get_helpers(self):

        return {'check_ckan_version': toolkit.check_ckan_version}
