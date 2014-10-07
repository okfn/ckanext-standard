from setuptools import setup, find_packages
import sys, os

version = '0.1'

setup(
    name='ckanext-standard',
    version=version,
    description="",
    long_description='''
    ''',
    classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
    keywords='',
    author='Sam Smith',
    author_email='sam.smith@okfn.org',
    url='',
    license='',
    packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
    namespace_packages=['ckanext', 'ckanext.standard'],
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        # -*- Extra requirements: -*-
    ],
    entry_points='''
        [ckan.plugins]
        # Add plugins here, e.g.
        # myplugin=ckanext.standard.plugin:PluginClass
        standard_theme=ckanext.standard.plugin:StandardPlugin
    ''',
)
