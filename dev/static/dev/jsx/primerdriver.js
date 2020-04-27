var platform_data = [
    { name: 'CODEHOP', href: 'http://www.blocks.fhcrc.org/codehop.html', desc: 'The PCR primers are designed from protein multiple sequence alignments' },
    { name: 'GeneWalker', href: 'http://www.cybergene.se/primerdesign/', desc: 'The program allows you to work with two primer sequences simultaneously' },
    { name: 'NetPrimer', href: 'http://www.premierbiosoft.com/netprimer.html', desc: 'This combines algorithms with a web-based interface, allowing the user to analyze the primer'},
    { name: 'Primer3', href: 'http://primer3.sourceforge.net/', desc: 'An online bioinformatics tool for PCR primer generation from nucleotide sequences' },
    { name: 'The Primer Generator', href: 'http://www.med.jhu.edu/medcenter/primer/primer.cgi', desc: 'The program analyses the original nucleotide sequence and desired amino acid sequence and designs a primer' },
    { name: 'Web Primer', href: 'http://genome-www2.stanford.edu/cgi-bin/SGD/web-primer', desc: 'An application that designs primers for PCR or sequencing purposes' },
    { name: 'MutScreener', href: 'http://bioapp.psych.uic.edu/MutScreener.html', desc: 'Assists in the analysis of human gene structure and design of PCR/sequencing primer' },
    { name: 'PrimerX', href: 'https://www.bioinformatics.org/primerx/index.htm', desc: 'PrimerX is a web-based program designed to automate the design of mutagenic PCR primers for site-directed mutagenesis.' }
];

var compare_data = [
    { name: 'Site-directed mutagenesis',           info: [1, 1, 1, 1, 1, 1, 1] },
    { name: 'Protein sequence-based design',       info: [1, 1, 1, 0, 1, 0, 0] },
    { name: 'DNA sequence-based design',           info: [1, 1, 0, 1, 1, 1, 1] },
    { name: 'Instructions/help function',          info: [1, 1, 1, 1, 1, 1, 1] },
    { name: 'Selection of mutagenic primer types', info: [1, 1, 1, 0, 0, 0, 0] },
    { name: 'Primer sequence',                     info: [1, 1, 1, 1, 1, 1, 1] },
    { name: 'Primer properties',                   info: [1, 1, 1, 1, 0, 1, 1] },
    { name: 'Batch design function',               info: [1, 0, 0, 0, 0, 0, 0] },
    { name: 'Expression system',                   info: [1, 1, 0, 0, 0, 0, 0] },
];

var organism_data = [
    {
        group: 'Virus',
        models: ['Phage lambda', 'Tobacco mosaic virus']
    },
    {
        group: 'Prokaryotes',
        models: ['Eschirichia coli K12', 'Bacillus subtilis', 'Caulobacter crescentus', 'Vibrioscheri', 'Synechocystis PCC 6803', 'Pseudomonas fluorescens']
    },
    {
        group: 'Protists',
        models: ['Chlamydomonas reinhardtii', 'Dictyostelium discoideum', 'Emiliania huxleyi', 'Tetrahymena thermophila', 'Thalassiosira pseudonana']
    },
    {
        group: 'Fungi',
        models: ['Ashbya gossypii ATCC 10895', 'Neurospora crassa', 'Saccharomyces cerevisiae', 'Schizophyllum commune', 'Schizosaccharomyces pombe', 'Ustilago maydis']
    },
    {
        group: 'Plants',
        models: ['Arabidopsis thaliana', 'Selaginella moellendorffii', 'Brachypodium distachyon', 'Lotus japonicus', 'Lemna gibba', 'Zea mays', 'Medicago truncatula', 'Mimulus', 'Oryza sativa', 'Physcomitrella patens']
    },
    {
        group: 'Invertebrates',
        models: ['Arbacia punctulata', 'Aplysia californica', 'Branchiostoma floridae', 'Caenorhabditis elegans', 'Ciona intestinalis', 'Drosophila melanogaster', 'Euprymna scolopes', 'Hydra vulgaris', 'Loligo pealei', 'Mnemiopsis leidyi', 'Nematostella vectensis', 'Oikopleura dioica', 'Oscarella carmela', 'Parhyale hawaiensis', 'Pristionchus pacicus', 'Schmidtea mediterranea', 'Strongylocentrotus purpuratus', 'Tribolium castaneum', 'Trichoplax adhaerens', 'Callosobruchus maculatus', 'Chorthippus parallelus', 'Gryllus bimaculatus', 'Bombina bombina']
    },
    {
        group: 'Vertebrates',
        models: ['Cavia porcellus', 'Cricetus cricetus', 'Mus musculus', 'Rattus norvegicus', 'Rattus rattus', 'Canis lupus', 'Canis familiaris', 'Oryctolagus cuniculus', 'Rana temporaria', 'Sigmodon hispidus', 'Xenopus laevis', 'Felis catus', 'Macaca mulatta', 'Gallus gallus', 'Taeniopygia guttata', 'Danio rerio', 'Poecilia reticulata', 'Cyprinodon variegatus', 'Oryzias latipes', 'Takifugu rubripes', 'Carassius auratus', 'Catla catla', 'Catostomus commersonii', 'Clarias gariepinus', 'Labeo rohita', 'Oncorhynchus mykiss', 'Oreochromis mossambicus', 'Oreochromis niloticus', 'Salmo trutta', 'Daphnia pulex']
    }
];


document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        platform_data.map((data, i) =>
            <tr key={i}>
                <td>
                    <a href={data.href} target='blank' style={{ color: 'mediumvioletred' }}>{ data.name }</a>
                </td>
                <td>{ data.desc }</td>
            </tr>
        ),
        document.getElementById('tab-software-body')
    );

    ReactDOM.render(
        compare_data.map((comp, i) =>
            <tr key={i} class="text-center">
                <td>{ comp.name }</td>
                {comp.info.map((inf, i) =>
                    <td>
                        { inf === 1 ? `\u2713` : `\u2717` }
                    </td>
                )}
            </tr>
        ),
        document.getElementById('tab-compare-body')
    );

    ReactDOM.render(
        organism_data.map((org, i) =>
            <React.Fragment>
                <tr key={i}>
                    <td rowspan={ org.models.length } className='align-middle'>{ org.group }</td>
                    <td>{ org.models[0] }</td>
                </tr>
                {org.models.slice(1).map((mod, j) =>
                    <tr key={i}>
                        <td>{ mod }</td>
                    </tr>
                )}
            </React.Fragment>
        ),
        document.getElementById('tab-organism-body')
    );
});
